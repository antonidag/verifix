import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import VerifixIcon from "@/assets/verifix-icon.png";
import { Button } from "@/components/ui/button";
import { SignInModal } from "./SignInModal";

export const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={VerifixIcon}
                alt="Verifix Icon"
                className="w-8 h-8 text-white"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Verifix
              </h1>
              <span className="text-sm text-slate-500 font-medium">
                AI Assistant
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/#features"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="/#knowledge"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Knowledge Base
            </a>
            <Link
              to="/api-docs"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              API Docs
            </Link>
            <Button
              variant="outline"
              className="border-blue-200 hover:bg-blue-50"
              onClick={() => setShowSignInModal(true)}
            >
              Sign In
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <SignInModal open={showSignInModal} onOpenChange={setShowSignInModal} />
    </header>
  );
};
