import { prisma } from "../utils/utils";

const users = [
  {
    "username": "admin",
    "email": "admin@email.com",
    "password": "951924d94a096ec7969864680a7089de3ac883a80d0a3ed4e48422fbeaa2afe1c436a6effa7a2bb4c5c60db994ed9268abca0e2a1743284282aa6a44a4a43ab0",
    "type": "admin",
    "salt": "4ce6ff7aa031a059a478778bd74bef33111174595489c3995d0a3644deeb"
  },
  {
    "username": "abdul",
    "email": "abdul@email.com",
    "password": "601dd00ed30381bada13790b87f6ad6267eac29634d0b143f0a6897c4fdc693ece69241395a16abbe178cfa5a9e79e105b7800e36ec3c21c6c81e093fdee32b0",
    "type": "regular",
    "salt": "1a12a9b94a7736b252a0fbb02f6d578acf63c0f3c6f43aed2459696995a7",
  }
]

const categories = [
  {
    "name": "politics",
    "description": "politics",
    "image": "",
  },
  {
    "name": "sports",
    "description": "sports",
    "image": "",
  },
  {
    "name": "business",
    "description": "business",
    "image": "",
  },
  {
    "name": "culture",
    "description": "culture",
    "image": "",
  },
  {
    "name": "entertainment",
    "description": "entertainment",
    "image": "",
  },
  {
    "name": "technology",
    "description": "technology",
    "image": "",
  },
]

const news = [
  {
    "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
    "categoryId": 2,
    "isTopStory": true,
    "isFeatured": false,
    "isEditorsPick": true,
    "media": "jdhvfvhvfvsfnjnbbanfsn",
    "content": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.
    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.
    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.
    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.
    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!
    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.
    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.
    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.
    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!
    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur.`,
  },
  {
    "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
    "categoryId": 2,
    "isTopStory": false,
    "isFeatured": true,
    "isEditorsPick": false,
    "media": "jdhvfvhvfvsfnjnbbanfsn",
    "content": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.
    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.
    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.
    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.
    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!
    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.
    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.
    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.
    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!
    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur.`,
  },
  {
    "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
    "categoryId": 2,
    "isTopStory": false,
    "isFeatured": false,
    "isEditorsPick": true,
    "media": "jdhvfvhvfvsfnjnbbanfsn",
    "content": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.
    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.
    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.
    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.
    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!
    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.
    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.
    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.
    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!
    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur.`,
  },
  {
    "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
    "categoryId": 2,
    "isTopStory": true,
    "isFeatured": false,
    "isEditorsPick": false,
    "media": "jdhvfvhvfvsfnjnbbanfsn",
    "content": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.
    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.
    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.
    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.
    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!
    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.
    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.
    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.
    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!
    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur.`,
  },
]

async function main() {

  await prisma.users.createMany({
    data: users
  });

  await prisma.categories.createMany({
    data: categories
  });

  await prisma.news.createMany({
    data: news
  });

}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });