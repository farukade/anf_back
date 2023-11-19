"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../utils/utils");
var users = [
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
        "salt": "1a12a9b94a7736b252a0fbb02f6d578acf63c0f3c6f43aed2459696995a7"
    }
];
var categories = [
    {
        "name": "politics",
        "description": "politics",
        "image": ""
    },
    {
        "name": "sports",
        "description": "sports",
        "image": ""
    },
    {
        "name": "business",
        "description": "business",
        "image": ""
    },
    {
        "name": "culture",
        "description": "culture",
        "image": ""
    },
    {
        "name": "entertainment",
        "description": "entertainment",
        "image": ""
    },
    {
        "name": "technology",
        "description": "technology",
        "image": ""
    },
];
var news = [
    {
        "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
        "categoryId": 2,
        "isTopStory": true,
        "isFeatured": false,
        "isEditorsPick": true,
        "media": "jdhvfvhvfvsfnjnbbanfsn",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.\n    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.\n    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.\n    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.\n    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!\n    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.\n    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.\n    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.\n    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!\n    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur."
    },
    {
        "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
        "categoryId": 2,
        "isTopStory": false,
        "isFeatured": true,
        "isEditorsPick": false,
        "media": "jdhvfvhvfvsfnjnbbanfsn",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.\n    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.\n    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.\n    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.\n    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!\n    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.\n    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.\n    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.\n    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!\n    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur."
    },
    {
        "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
        "categoryId": 2,
        "isTopStory": false,
        "isFeatured": false,
        "isEditorsPick": true,
        "media": "jdhvfvhvfvsfnjnbbanfsn",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.\n    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.\n    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.\n    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.\n    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!\n    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.\n    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.\n    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.\n    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!\n    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur."
    },
    {
        "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.",
        "categoryId": 2,
        "isTopStory": true,
        "isFeatured": false,
        "isEditorsPick": false,
        "media": "jdhvfvhvfvsfnjnbbanfsn",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae non ab perferendis necessitatibus molestiae quis officiis dolore nesciunt iure illum odit explicabo, dignissimos aspernatur nulla dolor incidunt sed nihil obcaecati.\n    Ut alias ipsam illo possimus veniam nesciunt dolorum fugiat quos iure minima in unde nulla odit minus architecto quod, vel sit. Illum, culpa aspernatur. Pariatur inventore modi quidem nulla deserunt.\n    Odit nam illo, esse voluptas vitae eum laboriosam corrupti in quaerat! Quam iste reprehenderit natus nulla similique labore ipsum modi quisquam eaque. Laudantium veniam, ipsam autem quo culpa recusandae dolor.\n    Hic quas laboriosam omnis ducimus quam quos explicabo, doloremque totam consequuntur provident commodi corrupti, eius amet unde exercitationem enim error. Magnam excepturi est qui laudantium vero hic illo accusamus voluptatibus.\n    Facilis nemo sint nulla eaque quos beatae dolorem, voluptate ut modi quas asperiores culpa molestias perspiciatis eius, fugit dolores veniam cupiditate ad similique omnis repudiandae sed sequi. Nulla, non qui!\n    Iure voluptates numquam, mollitia laboriosam veniam asperiores dolor nisi dolorem! Quos aperiam minus vero incidunt voluptatibus perferendis esse error aspernatur. Voluptates fugit ut eius saepe aliquid est quibusdam quo quisquam.\n    Perspiciatis voluptate dolores omnis distinctio fugiat, tenetur, autem voluptatum, quia magni sapiente mollitia assumenda nihil illum vero. Vero, porro corporis ab delectus ratione laboriosam necessitatibus cumque commodi optio. Earum, eius.\n    In, qui laboriosam sequi doloremque natus tempore, aut quibusdam sunt corporis aspernatur iure nulla exercitationem cumque. Quidem sint quis officiis molestiae expedita similique, nulla, impedit ullam omnis dolorem voluptatibus dicta.\n    Aperiam rem autem est ex aspernatur ad. Sequi accusamus et dolor sunt, consequuntur maiores nihil cumque facilis voluptatem omnis quas delectus, repellendus autem reprehenderit porro molestias inventore incidunt natus vero!\n    Eaque reprehenderit, deleniti, illo laudantium nulla assumenda possimus perferendis eligendi, iure porro ea? Voluptatem eaque reprehenderit molestiae. At magni repudiandae iusto velit blanditiis possimus sunt. Corrupti iusto voluptatem quis aspernatur."
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.prisma.users.createMany({
                        data: users
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, utils_1.prisma.categories.createMany({
                            data: categories
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, utils_1.prisma.news.createMany({
                            data: news
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(e);
                return [4 /*yield*/, utils_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=seed.js.map