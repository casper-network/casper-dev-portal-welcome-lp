export function getAssetURL(id: string): any {
    if (!id) return null;
    return `${process.env.GATSBY_DIRECTUS_URL}/assets/${id}`;
}
