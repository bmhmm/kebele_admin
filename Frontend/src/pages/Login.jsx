// import React, { useState } from "react";
// import { Building, LogIn } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     const newErrors = {};
//     if (!email) newErrors.email = "Email is required";
//     if (!password) newErrors.password = "Password is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await login(email, password);
//       if (!result.success) setErrors({ general: result.message });
//       else navigate(from, { replace: true });
//     } catch {
//       setErrors({ general: "Login failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-orange-950 flex items-center justify-center p-6 relative overflow-hidden">
//       {/* Animated background blobs */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-orange-900/30 via-orange-700/20 to-transparent rounded-full blur-3xl animate-slowspin top-[-200px] left-[-200px]" />
//         <div className="absolute w-[600px] h-[600px] bg-gradient-to-tl from-orange-700/25 via-orange-900/20 to-transparent rounded-full blur-3xl animate-slowspin-reverse bottom-[-150px] right-[-150px]" />
//         <div className="absolute w-[400px] h-[400px] bg-orange-800/10 rounded-full blur-2xl animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//           @keyframes slowspin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//           @keyframes slowspin-reverse {
//             from { transform: rotate(360deg); }
//             to { transform: rotate(0deg); }
//           }
//           @keyframes shimmer {
//             0% { background-position: -200% center; }
//             100% { background-position: 200% center; }
//           }
//           @keyframes fadeInUp {
//             0% { opacity: 0; transform: translateY(10px) scale(0.98); }
//             100% { opacity: 1; transform: translateY(0) scale(1); }
//           }
//           .animate-slowspin {
//             animation: slowspin 60s linear infinite;
//           }
//           .animate-slowspin-reverse {
//             animation: slowspin-reverse 80s linear infinite;
//           }
//           .animate-text-shimmer {
//             background-size: 200% auto;
//             animation: shimmer 4s linear infinite;
//           }
//           .animate-fadeInUp {
//             animation: fadeInUp 1.2s ease-out forwards;
//           }
//         `}
//       </style>

//       {/* Main Content */}
//       <div className="max-w-md w-full space-y-8 relative z-10">
//         {/* Header */}
//         <div className="text-center animate-fadeInUp">
//           <div className="w-20 h-20 bg-gradient-to-tr from-orange-900 via-orange-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,115,0,0.4)] animate-float">
//             <Building className="w-10 h-10 text-white" />
//           </div>

//           {/* 🔥 Animated Text */}
//           <h1
//             className="
//               text-3xl font-extrabold text-transparent bg-clip-text
//               bg-gradient-to-r from-orange-900 via-orange-300 to-orange-800
//               animate-text-shimmer drop-shadow-[0_0_20px_rgba(255,125,0,0.3)]
//             "
//           >
//             Ginjo Guduru Kebele
//           </h1>

//           <p className="text-orange-200/80 mt-1 tracking-wide">
//             Administration System
//           </p>
//         </div>

//         {/* Login Card - Updated colors */}
//         <Card className="bg-black backdrop-blur-xl border border-orange-500/60 shadow-[0_0_45px_rgba(255,125,0,0.3)] rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,125,0,0.4)]">
//           <CardHeader className="text-center space-y-2">
//             <CardTitle className="text-2xl font-semibold text-gray-900">
//               Welcome Back 👋
//             </CardTitle>
//             <CardDescription className="text-gray-900">
//               Sign in to continue your session
//             </CardDescription>
//           </CardHeader>

//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6">
//               {errors.general && (
//                 <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-700 text-sm">
//                   {errors.general}
//                 </div>
//               )}

//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-800">
//                   Email Address <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full px-4 py-3 rounded-xl bg-white/80 border focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder-gray-600 transition-all duration-200 ${
//                     errors.email
//                       ? "border-red-500/60"
//                       : "border-orange-400/60"
//                   }`}
//                   placeholder="Enter your email"
//                   required
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-800">
//                   Password <span className="text-red-600">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`w-full px-4 py-3 rounded-xl bg-white/80 border focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder-gray-600 transition-all duration-200 ${
//                       errors.password
//                         ? "border-red-500/60"
//                         : "border-orange-400/60"
//                     }`}
//                     placeholder="Enter your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition"
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               {/* Options */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 text-gray-900 text-sm">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-orange-600 bg-white/80 border-orange-500/50 rounded focus:ring-orange-600"
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <a
//                   href="#"
//                   className="text-sm text-gray-700 hover:text-gray-900 transition"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </CardContent>

//             <CardFooter>
//               {/* Updated Button for better contrast */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="relative w-full py-3 text-lg font-semibold text-gray-900 rounded-xl overflow-hidden group"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 group-hover:from-orange-600 group-hover:via-gray-900 group-hover:to-orange-600 transition-all duration-500"></span>
//                 <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] transition-all duration-700"></span>
//                 <span className="relative z-10 flex justify-center items-center gap-2 text-white">
//                   <LogIn className="w-5 h-5" />
//                   {loading ? "Signing in..." : "Sign In"}
//                 </span>
//               </button>
//             </CardFooter>
//           </form>
//         </Card>

//         {/* Demo Info - Updated colors */}
//         <div className="text-center p-4 bg-gray-400/80 backdrop-blur-md border border-orange-900/60 rounded-xl text-gray-800 text-sm shadow-[0_0_20px_rgba(255,125,0,0.25)]">
//           <strong>Demo:</strong> Enter any email and password to access the dashboard
//         </div>

//         {/* Footer */}
//         <div className="text-center text-orange-300/90 text-sm">
//           © 2025 Ginjo Guduru Kebele Administration. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




// LoginPage.jsx - UPDATED
import React, { useState } from "react";
import { Building, LogIn, User, Shield, Eye } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/Card";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showRoleInfo, setShowRoleInfo] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);

      if (!result.success) {
        setErrors({ general: result.message });
      } else {
        // Redirect based on user role
        const redirectTo = result.redirectTo || from;
        navigate(redirectTo, { replace: true });
      }
    } catch {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for quick testing
  const demoCredentials = [
    {
      role: "Administrator",
      email: "admin@ginjoguduru.gov.et",
      password: "admin123",
      description: "Full system access",
      color: "from-purple-900 to-purple-600"
    },
    {
      role: "Data Entry Clerk",
      email: "clerk@ginjoguduru.gov.et",
      password: "clerk123",
      description: "Can add/edit data",
      color: "from-blue-900 to-blue-600"
    },
    {
      role: "View Only",
      email: "viewer@ginjoguduru.gov.et",
      password: "viewer123",
      description: "Read-only access",
      color: "from-gray-900 to-gray-600"
    },
  ];

  const fillDemoCredentials = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setShowRoleInfo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-orange-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-orange-900/30 via-orange-700/20 to-transparent rounded-full blur-3xl animate-slowspin top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tl from-orange-700/25 via-orange-900/20 to-transparent rounded-full blur-3xl animate-slowspin-reverse bottom-[-150px] right-[-150px]" />
        <div className="absolute w-[400px] h-[400px] bg-orange-800/10 rounded-full blur-2xl animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slowspin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes slowspin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(10px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-slowspin {
            animation: slowspin 60s linear infinite;
          }
          .animate-slowspin-reverse {
            animation: slowspin-reverse 80s linear infinite;
          }
          .animate-text-shimmer {
            background-size: 200% auto;
            animation: shimmer 4s linear infinite;
          }
          .animate-fadeInUp {
            animation: fadeInUp 1.2s ease-out forwards;
          }
        `}
      </style>

      {/* Main Content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center animate-fadeInUp">
          <div className="w-20 h-20 bg-gradient-to-tr from-orange-900 via-orange-700 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(255,115,0,0.4)] animate-float">
            <Building className="w-10 h-10 text-white" />
          </div>

          <h1
            className="
              text-3xl font-extrabold text-transparent bg-clip-text
              bg-gradient-to-r from-orange-900 via-orange-300 to-orange-800
              animate-text-shimmer drop-shadow-[0_0_20px_rgba(255,125,0,0.3)]
            "
          >
            Ginjo Guduru Kebele
          </h1>

          <p className="text-orange-200/80 mt-1 tracking-wide">
            Role-Based Administration System
          </p>
        </div>

        {/* Demo Credentials Cards */}
        <div className="space-y-3">
          <p className="text-orange-200/90 text-center text-sm font-medium">
            Quick Login (Demo Credentials):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demoCredentials.map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => fillDemoCredentials(cred)}
                className={`
                  p-3 rounded-xl backdrop-blur-sm border transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                  ${email === cred.email ? 'ring-2 ring-orange-400' : ''}
                  bg-gradient-to-br ${cred.color} border-white/10
                `}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">
                      {cred.role}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs">{cred.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-black backdrop-blur-xl border border-orange-500/60 shadow-[0_0_45px_rgba(255,125,0,0.3)] rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,125,0,0.4)]">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Role-Based Access Control
            </CardTitle>
            <CardDescription className="text-gray-900">
              Your permissions depend on your role
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {errors.general && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-700 text-sm">
                  {errors.general}
                </div>
              )}

              {/* Role Information (Shows when demo credentials are selected) */}
              {showRoleInfo && (
                <div className="p-3 bg-gradient-to-r from-orange-900/30 to-orange-700/20 border border-orange-500/40 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-orange-300" />
                    <span className="text-orange-200 font-semibold">
                      Selected Role: {demoCredentials.find(c => c.email === email)?.role}
                    </span>
                  </div>
                  <p className="text-orange-200/80 text-sm">
                    {demoCredentials.find(c => c.email === email)?.description}
                  </p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500/70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder-gray-600 transition-all duration-200 ${errors.email
                        ? "border-red-500/60"
                        : "border-orange-400/60"
                      }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500/70" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/80 border focus:ring-2 focus:ring-gray-600 focus:border-transparent text-gray-900 placeholder-gray-600 transition-all duration-200 ${errors.password
                        ? "border-red-500/60"
                        : "border-orange-400/60"
                      }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 text-lg font-semibold text-gray-900 rounded-xl overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 group-hover:from-orange-600 group-hover:via-gray-900 group-hover:to-orange-600 transition-all duration-500"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] transition-all duration-700"></span>
                <span className="relative z-10 flex justify-center items-center gap-2 text-white">
                  <LogIn className="w-5 h-5" />
                  {loading ? "Signing in..." : `Sign In as ${email.includes('admin') ? 'Admin' : email.includes('clerk') ? 'Data Entry' : 'Viewer'}`}
                </span>
              </button>

              {/* Role Quick Info */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowRoleInfo(!showRoleInfo)}
                  className="text-sm text-orange-300 hover:text-orange-200 transition"
                >
                  {showRoleInfo ? 'Hide' : 'Show'} Role Information
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-orange-300/90 text-sm">
          © 2025 Ginjo Guduru Kebele Administration. Role-Based Access System
        </div>
      </div>
    </div>
  );
};

export default LoginPage;