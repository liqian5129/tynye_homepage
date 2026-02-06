
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it Works",
      compare: "Compare",
      pricing: "Pricing",
      preorder: "Pre-order",
      login: "Log in",
      dashboard: "Dashboard",
      logout: "Log out"
    },
    hero: {
      tag: "Pre-order now available",
      title: "Read more intently. Study smarter.",
      subtitle: "tynye AI Bookmark. Your intelligent paper book reading companion that helps you capture, understand, and retain knowledge without the screen time.",
      ctaPrimary: "Pre-order Now",
      ctaSecondary: "Watch Video",
      visualText: "See tynye in Action"
    },
    scenarios: {
      title: "Anywhere, Anytime",
      subtitle: "tynye fits seamlessly into every part of your intellectual life.",
      items: [
        { title: "Personal Study", desc: "Deep focus in your private sanctuary." },
        { title: "Public Library", desc: "Quiet efficiency among the shelves." },
        { title: "Nature's Quiet", desc: "Breath of fresh air for your thoughts." },
        { title: "Cafe Dialogue", desc: "Sharing insights over a cup of coffee." }
      ]
    },
    security: {
      title: "Secure Data Ecosystem",
      subtitle: "Your intellectual assets are protected by enterprise-grade encryption from device to cloud.",
      device: "Smart Device",
      cloud: "Encrypted Cloud",
      web: "Web Dashboard",
      description: "tynye ensures a seamless and secure flow of information. Your scanned snippets and voice notes are encrypted locally on the device, synchronized via secure tunnels to our private cloud, and instantly accessible on your web dashboard for long-term knowledge management."
    },
    testimonials: {
      title: "Real User Voices",
      subtitle: "Hear how tynye is transforming the reading experience for paper book lovers.",
      items: [
        {
          quote: "tynye changed my morning routine. I finally feel connected to my physical books again without losing the convenience of digital search.",
          name: "Aura",
          role: "PhD Candidate"
        },
        {
          quote: "The distraction-free aspect is priceless. I can scan a complex sentence and get an instant AI breakdown without ever touching my phone.",
          name: "Zen",
          role: "Philosophy Researcher"
        },
        {
          quote: "As an editor, the seamless export to Notion is a lifesaver. It captures my raw thoughts perfectly during the first immersive read.",
          name: "Ink",
          role: "Book Editor"
        }
      ]
    },
    features: {
      sectionTitle: "Features",
      mainTitle: "Designed for the Modern Reader",
      description: "tynye is the world's first AI bookmark that works independently from your phone. Scan paragraphs, generate notes, and discuss context—all while staying focused.",
      items: [
        { title: "Ultra Portable", desc: "Exquisite bookmark design. Physical companionship that fits perfectly inside your book." },
        { title: "Deep Focus", desc: "Immersive reading experience. Keep your phone away and stay in the flow state." },
        { title: "Smart Input", desc: "One-click scan and search. Efficiently capture content without photographing full pages." },
        { title: "Knowledge Graph", desc: "Build your personal knowledge map over time. Knowledge retention is a long-term investment." },
        { title: "Weekly Review", desc: "Random quick reviews and weekly reports ensure that what you read is truly remembered." },
        { title: "AI Insights", desc: "Let your notes grow. Connect and explore the content you've recorded with intelligent AI analysis." }
      ]
    },
    comparison: {
      title: "Why tynye?",
      subtitle: "The perfect balance between physical utility and digital intelligence.",
      col1: "Features",
      col2: "tynye AI",
      col3: "Scanner Pen",
      col4: "Phone App",
      rows: [
        "One-click Record",
        "Note Categorization",
        "AI Search & Voice Interaction",
        "AI Reading Companion",
        "Weekly Reading Reports",
        "Multi-modal Input (Voice+Photo)",
        "Export to Note Apps",
        "Ultra-thin Bookmark Design",
        "Distraction-free Reading"
      ]
    },
    howItWorks: {
      title: "How tynye Works",
      steps: [
        { label: "Input & Memory", title: "Effortless Capture", desc: "Use the camera to intelligently frame quotes, or use voice-to-text to record your thoughts instantly. Tag and categorize on the fly." },
        { label: "Thinking & Discussion", title: "Deep Dive with AI", desc: "Encounter a difficult concept? Ask your AI Buddy. Expand on knowledge points and let AI guide your learning path." },
        { label: "Knowledge Management", title: "Build Your Graph", desc: "Automatically generate knowledge graphs and mind maps. Review weekly reports and export everything to your favorite note apps." }
      ],
      features: [
        ['Smart Frame Selection', 'Voice Notes', 'Instant Tagging'],
        ['Quick Lookup', 'Contextual AI Chat', 'Study Guidance'],
        ['Knowledge Graphs', 'Feynman Method', 'Export to Notion/Obsidian']
      ]
    },
    pricing: {
      title: "Ready to Transform Your Reading?",
      subtitle: "Join the future of intelligent reading. Pre-order now and receive exclusive early-bird pricing plus a free premium subscription for 1 year.",
      points: [
        "AI Chat Points: 100 points/year (10M Tokens)",
        "1000 Minutes Voice-to-Text",
        "10G Cloud Storage"
      ],
      earlyBird: "Early Bird Offer",
      guarantee: "Limited time offer • 30-day money-back guarantee",
      cta: "Pre-order Now"
    },
    footer: {
      description: "The world's first AI bookmark designed for paper book lovers. Reclaim your focus and build your knowledge graph.",
      product: "Product",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    auth: {
      loginTitle: "Welcome Back",
      registerTitle: "Join tynye",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      signIn: "Sign In",
      signUp: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      loggingIn: "Logging in...",
      toggleLogin: "Sign Up",
      toggleRegister: "Log In",
      useEmail: "Use Email",
      usePhone: "Use Phone",
      placeholderEmail: "name@example.com",
      placeholderPhone: "Enter your phone number"
    },
    dashboard: {
      welcome: "Welcome back,",
      menuAccount: "Account Overview",
      menuNotes: "My Notes",
      menuInsights: "Insights",
      stats: {
        tokens: "Tokens Used",
        storage: "Cloud Storage",
        plan: "Membership"
      },
      device: {
        title: "Device Management",
        name: "tynye AI Bookmark",
        status: "Connected",
        lastSync: "Last synced: Just now",
        storage: "Device Storage"
      },
      profile: {
        title: "Personal Profile",
        subtitle: "Customize your reading persona for better AI recommendations.",
        edit: "Edit Profile",
        summary: "Profile Summary",
        wizard: {
            title: "Setup Your Profile",
            step: "Step",
            next: "Next",
            prev: "Back",
            finish: "Finish"
        },
        ageGroup: "Age Group",
        gender: "Gender",
        readingLanguage: "Reading Language",
        favoriteGenres: "Favorite Genres",
        readingPurpose: "Reading Purpose",
        writingStyle: "AI Persona Style",
        save: "Save Changes",
        saved: "Profile Saved!",
        options: {
          age: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"],
          gender: ["Male", "Female", "Non-binary", "Prefer not to say"],
          language: ["English", "Chinese", "Bilingual"],
          genres: ["Fiction", "Philosophy", "History", "Business", "Science", "Biography", "Psychology", "Self-Help"],
          purpose: ["Professional Growth", "Academic Research", "Casual Reading", "Skill Acquisition", "Inspiration"],
          style: ["Concise & Direct", "Detailed & Academic", "Witty & Humorous", "Warm & Encouraging"]
        }
      },
      notes: {
        title: "Synced Notes",
        subtitle: "Manage your scanned snippets and AI insights from your tynye device.",
        selectAll: "Select All",
        export: "Export",
        exportPdf: "Export as PDF",
        exportMd: "Export as Markdown",
        exportHtml: "Export as Offline HTML",
        exportAudio: "Export Audio File",
        search: "Search notes...",
        noNotes: "No notes found.",
        book: "Book",
        date: "Date",
        details: "Note Details",
        back: "Back to List",
        backToFolders: "Back to Folders",
        folders: "Folders",
        allTags: "All Tags",
        backToTags: "Back to Tags",
        itemsCount: "notes",
        filter: {
          title: "Filter Options",
          startDate: "Start Date",
          endDate: "End Date",
          search: "Search",
          reset: "Reset",
          to: "to"
        },
        types: {
            text: "Idea",
            audio: "Voice Note",
            excerpt: "Excerpt",
            chat: "Discussion"
        },
        fields: {
            subNotes: "My Sub-notes",
            transcription: "Transcription",
            ocrText: "OCR Text",
            timestamps: "Key Moments",
            original: "Original Source",
            synced: "Synced"
        }
      },
      insights: {
        title: "AI Insights",
        subtitle: "Weekly reports and knowledge synthesis generated from your reading habits.",
        source: "Source Notes:",
        range: "Date Range:",
        noInsights: "No insights generated yet. Keep reading!",
        export: "Export Report"
      },
      viewOptions: {
        label: "Group by:",
        date: "Date",
        book: "Book",
        tag: "Tag"
      }
    }
  },
  zh: {
    nav: {
      features: "产品特点",
      howItWorks: "怎么用",
      compare: "对比",
      pricing: "价格",
      preorder: "立即预定",
      login: "登录",
      dashboard: "个人中心",
      logout: "退出登录"
    },
    hero: {
      tag: "预定现已开启",
      title: "更专注地阅读，更聪明的学习",
      subtitle: "tynye AI书签，你的纸质书阅读伙伴。世界上第一款AI书签，可以独立于手机使用，专为纸质书阅读设计。",
      ctaPrimary: "立即预定",
      ctaSecondary: "观看视频",
      visualText: "观看产品展示"
    },
    scenarios: {
      title: "随时随地，沉浸其中",
      subtitle: "tynye 完美融入你知性生活的每一个瞬间。",
      items: [
        { title: "书房私享", desc: "在私人领域深度专注。" },
        { title: "静谧馆藏", desc: "在书架间高效学习。" },
        { title: "自然呼吸", desc: "在大自然中放飞思绪。" },
        { title: "啡语讨论", desc: "一杯咖啡，两个人的思想碰撞。" }
      ]
    },
    security: {
      title: "全链路数据安全生态",
      subtitle: "从设备到云端，您的知识资产由企业级加密全程守护。",
      device: "智能硬件",
      cloud: "加密云端",
      web: "网页端管理",
      description: "tynye 确保信息的无缝且安全流动。您的扫描片段和语音笔记在设备端即刻加密，通过安全隧道同步至私有云，并立即呈现在您的网页仪表盘上，助您进行长期的知识管理与内化。"
    },
    testimonials: {
      title: "真实用户声音",
      subtitle: "听听书友们如何评价 tynye 带来的阅读革命。",
      items: [
        {
          quote: "tynye 改变了我的早读习惯。我终于找回了与纸质书的连接感，同时又保留了数字搜索的便利。",
          name: "灵曦",
          role: "在读博士生"
        },
        {
          quote: "那种‘无干扰’的体验是无价的。在读学术专著时，我可以一键扫描复杂的段落并获得 AI 解析，完全不需要碰手机。",
          name: "静修",
          role: "哲学研究员"
        },
        {
          quote: "作为一名编辑，tynye 无缝导出到 Notion 的功能简直是救星。它完美记录了我初读时那些零碎的想法。",
          name: "墨香",
          role: "图书编辑"
        }
      ]
    },
    features: {
      sectionTitle: "产品信息",
      mainTitle: "懂你的阅读伙伴",
      description: "tynye是世界上第一款AI书签。用户可以通过设备扫描词语或者段落，生成摘抄笔记.结合上下文解释内容，构建个人知识图谱。",
      items: [
        { title: "极度便携", desc: "精美的书签，物理伴随感，『读书搭子』的实体化。" },
        { title: "专注稀缺", desc: "沉浸的阅读体验，不被手机app打扰。" },
        { title: "高效便捷", desc: "快速准确的输入内容，一键摘抄和搜索，无需上传整页。" },
        { title: "知识留存", desc: "构建纸质书爱好者的个人知识图谱，知识留存是长期投资。" },
        { title: "定期回顾", desc: "不定期的快速回顾笔记，让记录不再是一次性的事情。" },
        { title: "AI洞察", desc: "让笔记生长，连接和探索我们记录的内容。" }
      ]
    },
    comparison: {
      title: "产品对比",
      subtitle: "AI书签 vs 传统扫描笔 vs 手机APP",
      col1: "功能特性",
      col2: "tynye AI",
      col3: "传统扫描笔",
      col4: "手机&APP",
      rows: [
        "一键记录，极致易用",
        "笔记归类，随时回顾",
        "AI搜索，语音交互",
        "读书搭子，思考讨论",
        "阅读报告，每周回顾",
        "录音+拍照，多模态想法记录",
        "导出关联主流笔记软件",
        "轻薄书签设计，便携",
        "纸质书沉浸阅读，远离手机"
      ]
    },
    howItWorks: {
      title: "怎么用",
      steps: [
        { label: "输入和记忆", title: "一键拍照，智能框选", desc: "书签笔记，标签归类。语音文字输入自己的想法，随时回顾笔记，搜索内容。" },
        { label: "思考与讨论", title: "AI读书搭子深入讨论", desc: "陌生信息快速查，知识点展开和AI引导学习路径。" },
        { label: "知识总结和管理", title: "知识图谱总结与思维导图", desc: "阅读报告和每周回顾，费曼学习法，内容导出，关联你的笔记软件。" }
      ],
      features: [
        ['书签笔记，标签归类', '语音文字输入', '随时回顾笔记'],
        ['陌生信息快速查', '知识点展开', 'AI引导学习路径'],
        ['知识图谱总结', '费曼学习法', '内容导出']
      ]
    },
    pricing: {
      title: "准备好改变你的阅读方式了吗？",
      subtitle: "加入智能阅读的未来。现在预订即可享受早鸟价，并获赠一年高级会员订阅。",
      points: [
        "AI对话点数100点/年 (1点 = 十万Token)",
        "1000分钟语音转写",
        "10G云端存储"
      ],
      earlyBird: "早鸟优惠",
      guarantee: "限时优惠 • 30天无理由退款",
      cta: "立即预定"
    },
    footer: {
      description: "世界上第一款AI书签，专为纸质书阅读设计的智能设备。",
      product: "产品",
      contact: "联系我们",
      rights: "版权所有",
      privacy: "隐私政策",
      terms: "服务条款"
    },
    auth: {
      loginTitle: "欢迎回来",
      registerTitle: "加入 tynye",
      email: "邮箱地址",
      phone: "手机号码",
      password: "密码",
      signIn: "登录",
      signUp: "创建账户",
      noAccount: "还没有账户？",
      hasAccount: "已经有账户了？",
      loggingIn: "登录中...",
      toggleLogin: "注册",
      toggleRegister: "登录",
      useEmail: "邮箱登录",
      usePhone: "手机号登录",
      placeholderEmail: "name@example.com",
      placeholderPhone: "请输入手机号码"
    },
    dashboard: {
      welcome: "欢迎回来，",
      menuAccount: "账户概览",
      menuNotes: "我的笔记",
      menuInsights: "洞察",
      stats: {
        tokens: "已用Token",
        storage: "云端存储",
        plan: "会员身份"
      },
      device: {
        title: "设备管理",
        name: "tynye AI书签",
        status: "已连接",
        lastSync: "上次同步: 刚刚",
        storage: "设备存储"
      },
      profile: {
        title: "个人资料",
        subtitle: "完善您的阅读画像，获取更精准的AI推荐。",
        edit: "完善个人信息",
        summary: "个人信息概览",
        wizard: {
            title: "完善个人信息",
            step: "第",
            next: "下一步",
            prev: "上一步",
            finish: "完成"
        },
        ageGroup: "年龄段",
        gender: "性别",
        readingLanguage: "阅读语言",
        favoriteGenres: "偏好书籍类型",
        readingPurpose: "阅读目的",
        writingStyle: "AI写作风格偏好",
        save: "保存修改",
        saved: "资料已保存！",
        options: {
          age: ["18岁以下", "18-24岁", "25-34岁", "35-44岁", "45-54岁", "55岁以上"],
          gender: ["男", "女", "非二元性别", "保密"],
          language: ["中文", "英文", "中英双语"],
          genres: ["虚构文学", "哲学", "历史", "商业财经", "科普", "传记", "心理学", "自我提升"],
          purpose: ["职业发展", "学术研究", "休闲阅读", "技能习得", "灵感启发"],
          style: ["简洁直接", "详尽学术", "幽默风趣", "温暖鼓励"]
        }
      },
      notes: {
        title: "云端笔记",
        subtitle: "管理从tynye设备同步的摘抄与AI洞察。",
        selectAll: "全选",
        export: "导出",
        exportPdf: "导出为 PDF",
        exportMd: "导出为 Markdown",
        exportHtml: "导出为离线 HTML",
        exportAudio: "导出音频文件",
        search: "搜索笔记...",
        noNotes: "没有找到笔记。",
        book: "书籍",
        date: "日期",
        details: "笔记详情",
        back: "返回列表",
        backToFolders: "返回书架",
        folders: "书架",
        allTags: "全部标签",
        backToTags: "返回标签",
        itemsCount: "条笔记",
        filter: {
          title: "设置筛选范围",
          startDate: "开始日期",
          endDate: "结束日期",
          search: "搜索",
          reset: "重置",
          to: "至"
        },
        types: {
            text: "文本笔记",
            audio: "录音笔记",
            excerpt: "摘抄笔记",
            chat: "对话笔记"
        },
        fields: {
            subNotes: "我的子笔记",
            transcription: "语音转录",
            ocrText: "OCR识别文本",
            timestamps: "关键时间戳",
            original: "原始文件",
            synced: "已同步"
        }
      },
      insights: {
        title: "AI 洞察",
        subtitle: "基于您的阅读习惯生成的每周报告与知识总结。",
        source: "来源笔记:",
        range: "时间范围:",
        noInsights: "暂无洞察报告，请继续阅读！",
        export: "导出报告"
      },
      viewOptions: {
        label: "分组方式：",
        date: "日期",
        book: "书籍",
        tag: "标签"
      }
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
