"use client"

import NavBarShared from "../NavbarShared"

export default function  Navbar() {

    const navbarProps: NavbarProps = {
        endPoints: [
            {
                href: '/aws-s3-app/posts',
                text: 'Your posts'
            },
            {
                href: '/aws-s3-app/upload',
                text: 'Create new post'
            }
        ],
        resources: [
            {
                resourceType: 'Github',
                href: 'https://github.com/PAIKY-ORGANIZATION/AWS_S3_Public'
            },
        ],
        docsHref: 'https://documenter.getpostman.com/view/40182356/2sB34foMGE'
    }

    return (
        <NavBarShared endPoints={navbarProps.endPoints} resources={navbarProps.resources}></NavBarShared>
    )
}