```toml
Title =  "Note"
LanguageCode = "zh-CN"
BaseUrl = "https://note-eosin.vercel.app/"
Theme =  "next"
MetaDataFormat =  "yaml"
CanonifyUrls =  true
BuildDrafts =  false
PaginatePath =  "p"
Paginate = 5
DisablePathToLower =  false
HasCJKLanguage = true
PreserveTaxonomyNames = false
UglyUrls = false
# PygmentsStyle = "monokai"
# pygmentsCodefences = true
# pygmentsCodefencesGuessSyntax = true
DefaultContentLanguage = "zh"

[Params]
  Introduce = "前端 | 后端 | 杂记"
  Description = "笔记"
  Keywords =  "笔记"
  Subtitle = "每天八杯水"
  Imglogo = "/img/logo.png"
  AuthorImg = "/img/author.png"
  DateFormat = "2006-01-02"
  YearFormat = "2006年"
  MonthFormat = "01-02"
  #BaiduStatsId = "0b07433b4ab8d587dae7d34e71973839"
  #QQStatsId = "58416275"
  RevolverMapId = "5b4f2ucxar7"
  Fancybox = true
  toc = true

[Author]
  Name = "lei"

[Params.Share]
  #DuoShuo = "lanlingzi"
  # Baidu = true

[Params.utterances]  # https://utteranc.es/
  owner = ""         # Your GitHub ID
  repo = ""          # The repo to store comments

[[Menu.Main]]
  Name = "首页"
  Pre = "home"
  URL = "/"
  Weight = 1
[[Menu.Main]]
  Name = "归档"
  Pre = "code"
  URL = "/post"
  Weight = 2
[[Menu.Main]]
  Name = "标签"
  Pre = "tint"
  URL = "/tags"
  Weight = 3
[[Menu.Main]]
  Name = "分类"
  Pre = "book"
  URL = "/categories"
  Weight = 4
[[Menu.Main]]
  Name = "关于"
  Pre = "leaf"
  URL = "/about"
  Weight = 5
  
[markup]
  defaultMarkdownHandler = 'goldmark'
  [markup.goldmark]
    [markup.goldmark.parser]
      autoHeadingID = true
      autoHeadingIDType = 'github'
      [markup.goldmark.parser.attribute]
        block = false
        title = true
    [markup.goldmark.renderer]
      hardWraps = false
      unsafe = true
      xhtml = false
  [markup.highlight]
    anchorLineNos = false
    codeFences = true
    guessSyntax = true
    lineNoStart = 1
    lineNos = true
    lineNumbersInTable = true
    noClasses = true
    noHl = false
    style = 'github'
    tabWidth = 2
  [markup.tableOfContents]
    endLevel = 3
    startLevel = 1
    
# [[Params.Socials]]
#   Name = "GitHub"
#   Icon = "github"
#   URL = "https://github.com/xtfly/"
```

