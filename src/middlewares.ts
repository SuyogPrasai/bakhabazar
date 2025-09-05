// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone(); // Clone the URL object to modify it

//   // Check if the requested URL is the root ("/")
//   if (url.pathname === "/") {
//     url.pathname = "/home"; // Redirect to "/home"
//     return NextResponse.redirect(url); // Perform the redirect
//   }

//   // Return the original request for other paths
//   return NextResponse.next();
// }

// // Define paths that should trigger the middleware
// export const config = {
//   matcher: [
//     "/", // Root path
//     "/signin",
//     "/register",
//   ],
// };
