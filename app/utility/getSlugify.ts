import slugify from "slugify";

export function getSlugify(title:string) {
    return slugify(title, {
        replacement:"-",
        lower: true,
        trim: true,
        strict: true,
        locale: "en",
        remove: /[*+~.()'"!:@]/g
      })
}