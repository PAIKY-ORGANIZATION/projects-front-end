import Navbar from "@/components/aws-s3-app/Navabar";

export const metadata = {
  title: 'Post to AWS S3',
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

    return (
        <>
            <Navbar></Navbar>
			<div className='fixed top-0 left-50  bottom-0 right-50 bg-[#212121] z-[-1]'></div>

            {children}
        </>

    );
}


