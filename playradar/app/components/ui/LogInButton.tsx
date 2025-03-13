import * as React from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@/app/components/features/Avatar";

interface LogInButtonProps {
  className?: string;
}

const LogInButton: React.FC<LogInButtonProps> = ({ className = "" }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <div className={`gap-4 ml-4 ${className}`}>
      {user ? (
        <Avatar />
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="font-bold bg-transparent text-lg relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:rounded-full"
        >
          LOG IN
        </button>
      )}
    </div>
  );
};

export default LogInButton;