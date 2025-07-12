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
            {
                resourceType: 'Youtube',
                href: 'https://github.com/PAIKY-ORGANIZATION/AWS_S3_Public'
            }
        ]
    }

    return (
        <NavBarShared endPoints={navbarProps.endPoints} resources={navbarProps.resources}></NavBarShared>
    )
}