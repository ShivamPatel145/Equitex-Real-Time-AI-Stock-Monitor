import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button>Hello, Next.js!</Button>
      <img src="./assets/icons/logo.svg" alt="Logo" className="bg-gray-300" />
    </div>
  )
}

export default Home