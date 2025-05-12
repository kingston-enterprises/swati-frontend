import { useEffect, useState } from "react";
import  logo2 from "../../assets/logo2.svg";
import { PhoneInput } from "../../components/custom/PhoneInput";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { login } from "../../features/auth/authSlice";
import Loader from "../../components/custom/Loader";
import { Input } from "../../components/custom/Input"; 
import { Button } from "../../components/custom/Button"; 

type Props = {};

export const Login = ({}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


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
  
    const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen w-full bg-accent p-4">
      <div className="w-full max-w-2xl mx-auto">
        <a
          href="/"
          className="flex items-center justify-center mb-6 text-2xl font-semibold text-primary"
        >
          <img
            className="w-8 h-8 mr-2"
            src={logo2 || "/placeholder.svg"}
            alt="logo"
          />
          Swatini
        </a>
        <div className="bg-primary shadow-lg shadow-secondary rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
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
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Phone number
                </label>
                <PhoneInput
                  className=""
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="SZ"
                  placeholder="Enter a phone number"
                />
              </div>

                {/* Password */}
                <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e:any) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    variant="primary"
                    rounded="md"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                </div>
                
                <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-700 focus:ring-3 focus:ring-accent"
                  checked={termsAccepted}
                  onChange={(e:any) => setTermsAccepted(e.target.checked)}
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-light text-gray-300"
                >
                  I accept the{" "}
                  <a
                    href="/terms"
                    className="font-medium text-accent hover:underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and the{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-accent hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

                 <div className="flex gap-5 p-3 flex-row items-center justify-center">
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="w-full"
                  variant="secondary-outline"
                  rounded="md"
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!termsAccepted}
                  variant="secondary"
                  rounded="md"
                  className="w-full"
                  size="lg"
                >
                  Log In
                </Button>
              </div>

                {/* <button
                  type="submit"
                  className="w-full text-primary bg-secondary hover:bg-foreground2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button> */}
            <p className="text-sm font-light text-secondary text-center">
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
