
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