import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Blogstate } from "@/contexts/blogs/Blogstate";
import { AlertState } from "@/contexts/alerts/Alertstate";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blogiste",
  description: "This contains a user blogs and he can apply the CRUD operations on the blogs that are availble.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body 
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <AlertState>
        <Blogstate>
        <Navbar/>
        <Alert/>
        <Spinner/>
        <div className=" min-h-[81vh]">
          {children}
          </div>
          
        <Footer/>
        </Blogstate>
        </AlertState>
      </body>
     
    </html>
  );
}
