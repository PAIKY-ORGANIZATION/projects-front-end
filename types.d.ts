
type urlTypes =  'Github' | 'Youtube'  | 'NPM package'

type NavbarProps = {
    endPoints: {
        href: string,
        text: string
    }[],
    resources: {
        resourceType: urlTypes;
        href: string

    }[]
}


type ImageMetadata =  {
    uniqueuseridentifier: string, //! AWS for some reason makes this all lower case that is why I said it like this.
    description: string
}