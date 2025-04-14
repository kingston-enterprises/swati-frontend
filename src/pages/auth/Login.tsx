import { useEffect, useState } from "react";
import  logo from "@/assets/logo.svg";
import { PhoneInput } from "@/components/custom/PhoneInput";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useNavigation from "@/hooks/useNavigation";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/features/auth/authSlice";
import Loader from "@/components/custom/Loader";

type Props = {};

export const Login = ({}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const [, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { user, isLoading, isError, isSuccess } = useSelector(
    (state: any) => state.auth
  );

  const { toast } = useToast();

useEffect(() => {
  if (isError) {
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid credentials. Please try again.",
    });
  }

  if (isSuccess && user) {
    toast({
      variant: "default",
      title: "Login successful",
      description: `Welcome back, ${user.first_name || 'user'}!`,
    });
    navigate("/dashboard"); 
  }
}, [user, isError, isSuccess, navigate, toast]);


  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userData = {
      phone_number: phoneNumber,
      password: password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen w-full bg-primary-accent p-4">
      <div className="w-full max-w-2xl mx-auto">
        <a
          href="/"
          className="flex items-center justify-center mb-6 text-2xl font-semibold text-primary"
        >
          <img
            className="w-8 h-8 mr-2"
            src={logo || "/placeholder.svg"}
            alt="logo"
          />
          Swatini
        </a>
        <div className="bg-tetiary shadow-lg shadow-secondary rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-white text-center">
          Sign Into Your Account
              </h1>
              <form
                onSubmit={onSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                {/* Phone number */}
                <div>
                  <label
                    htmlFor="phone-input"
                    className="mb-2 text-sm font-medium text-white"
                  >
                    Phone number:
                  </label>
                  <PhoneInput
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e);
                    }}
                    defaultCountry="SZ"
                    placeholder="Enter a phone number"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="phone-input"
                    className="mb-2 text-sm font-medium text-white"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-white text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                 <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 text-white bg-secondary hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 text-white bg-secondary hover:bg-accent/80 focus:ring-4 focus:outline-none focus:ring-accent/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                >
                  Sign In
                </button>
              </div>

                {/* <button
                  type="submit"
                  className="w-full text-primary bg-secondary hover:bg-foreground2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button> */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-accent hover:underline"
                  >
                    Sign Up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
