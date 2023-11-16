import slugify from "slugify";

export function getSlugify(title:string) {
    return slugify(title, {
        lower: true,
        trim: true,
        remove: /[*+~.()'"!:@]/g
      })
}