import Navbar from "@/components/aws-s3-app/Navabar";


export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    return (
        <>
            <Navbar></Navbar>
            {children}
        </>

    );
}


