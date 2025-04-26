import { useEffect, useState } from "react";
import logo2 from "../../assets/logo2.svg";
import { PhoneInput } from "../../components/custom/PhoneInput";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { register } from "../../features/auth/authSlice";
import { useToast } from "../../hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/custom/Loader";
import Input from "../../components/Input"; 
import Button from "../../components/Button"; 

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(
    (state: any) => state.auth
  );
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    }

    if (user) {
      navigate("/login");
      toast({
        variant: "default",
        title: "Congratulations",
        description: "Sign Up successful",
      });
    }
  }, [user, isError, message, navigate, toast]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Uh oh! Passwords don't match",
        description: "Please confirm your password",
      });
    } else if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please accept the Terms and Conditions and Privacy Policy.",
      });
    } else {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
      };
      dispatch(register(userData));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
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
              Create an account
            </h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e:any) => setFirstName(e.target.value)}
                    variant="primary" 
                    rounded="md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e:any) => setLastName(e.target.value)}
                    variant="primary" 
                    rounded="md"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e:any) => setEmail(e.target.value)}
                  variant="primary" 
                  rounded="md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone-input"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Phone number
                </label>
                <PhoneInput
                  className="transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-full inline-flex items-center w-full bg-primary-accent focus:ring-primary focus:border-primary text-primary"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="SZ"
                  placeholder="Enter a phone number"
                />
              </div>

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

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e:any) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    variant="primary"
                    rounded="md"
                    required
                  /><button
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
                  Sign Ip
                </Button>
              </div>
            </form>
            <p className="text-sm font-light text-secondary text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-accent hover:underline"
              >
                Sign In here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
