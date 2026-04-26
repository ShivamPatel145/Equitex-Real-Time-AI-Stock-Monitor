import { inngest } from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompts";
import { sendWelcomeEmail } from "@/lib/nodemailer";

type UserCreatedEventData = {
  email: string;
  name: string;
  country?: string;
  investmentGoals?: string;
  riskTolerance?: string;
  preferredIndustry?: string;
};

type InferredIntroResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

const DEFAULT_WELCOME_INTRO =
  "Thanks for joining Equitex. You now have the tools to track markets and make smarter moves.";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "equitex-sign-up-email",
    triggers: [{ event: "app/user.created" }],
  },
  async ({ event, step }) => {
    const data = event.data as UserCreatedEventData;

    const userProfile = `
            - Country: ${data.country ?? "Not provided"}
            - Investment goals: ${data.investmentGoals ?? "Not provided"}
            - Risk tolerance: ${data.riskTolerance ?? "Not provided"}
            - Preferred industry: ${data.preferredIndustry ?? "Not provided"}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    let introText = DEFAULT_WELCOME_INTRO;

    try {
      const response = await step.ai.infer("generate-welcome-intro", {
        model: step.ai.models.gemini({
          model: "gemini-2.5-flash-lite",
          apiKey: process.env.GEMINI_API_KEY,
        }),
        body: {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      const inferResponse = response as unknown as InferredIntroResponse;
      const part = inferResponse.candidates?.[0]?.content?.parts?.[0];

      if (part && typeof part.text === "string" && part.text.trim()) {
        introText = part.text;
      }
    } catch (error) {
      console.error("AI welcome intro generation failed", error);
    }

    await step.run("send-welcome-email", async () => {
      return sendWelcomeEmail({
        email: data.email,
        name: data.name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  },
);
