import Navbar from "@/components/aws-s3-app/Navabar";

export const metadata = {
  title: 'Post to AWS S3',
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    return (
        <>
            <Navbar></Navbar>
            {children}
        </>

    );
}


