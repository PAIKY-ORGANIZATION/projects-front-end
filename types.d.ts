
type urlTypes =  'Github' | 'Youtube'  | 'NPM package'

type NavbarProps = {
    endPoints: {
        href: string,
        text: string
    }[],
    resources: {
        resourceType: urlTypes;
        href: string

    }[],
    docsHref?: string
}


type ImageMetadata =  {
    uniqueuseridentifier: string, //! AWS sets metadata all lower case that is why I set it like this.
    description: string
}