let langs = {
  en: {
    home: {
      clickToAdd: "Click on the add button to add a new city",
      outDatedData:
        "Outdated data, Check your internet connection then hit refresh",
      refresh: "Refresh",
      more: "More",
      quran: "Continue Recitation",
      alerts: {
        ok: "OK",
        unknown_city: {
          title: "Unknown city",
          text: "We couldn't find this city"
        },
        data_unavailable: {
          title: "Data unavailabale",
          text: "Please connect to the internet for update"
        }
      },
      toast: {
        non_connection: "Non connection\n Data is loading from local storage",
        not_connected:
          "Non connection\n This data may be outdated, please connect to the internet for update"
      }
    },
    config: {
      title: "Settings",
      general: "General settings",
      languages: "Languages",
      date_time: "Date and Time settings",
      daylight: "Daylight time",
      adjust_hijri: "Adjust hijri date",
      unit_system: "Unit system settings",
      unit: "Unit system",
      athan: "Athan settings",
      calc_method: "Calculation method",
      madhab: "Madhab",
      athan_audio: "Athan audio",
      listen: "Listen",
      stop: "Stop",
      notif_prayers: "Notifications of prayers",
      notif_before: "Notification before n minute",
      validate: "Validate",

      toast: {
        updated: "Settings updated"
      },
      methods: {
        MuslimWorldLeague: "Muslim World League.",
        Egyptian: "Egyptian General Authority of Survey.",
        Karachi: "University of Islamic Sciences, Karachi.",
        UmmAlQura: "Umm al-Qura University, Makkah.",
        Gulf: "Modified version of Umm al-Qura used in UAE.",
        Qatar: "Modified version of Umm al-Qura used in Qatar.",
        Kuwait: "Method used by the country of Kuwait.",
        MoonsightingCommittee: "Moonsighting Committee.",
        NorthAmerica: "Referred to as the ISNA method."
      },
      madhabs: [
        {
          key: "Shafi",
          name: "Shafi : Earlier Asr time"
        },
        {
          key: "Hanafi",
          name: "Hanafi : Later Asr time"
        }
      ],
      prayers: [
        {
          key: "fajr",
          name: "fajr"
        },
        {
          key: "sunrise",
          name: "sunrise"
        },
        {
          key: "dhuhr",
          name: "dhuhr"
        },
        {
          key: "asr",
          name: "asr"
        },
        {
          key: "maghrib",
          name: "maghrib"
        },
        {
          key: "isha",
          name: "isha"
        }
      ],
      athans: [
        {
          key: "mekkah.wav",
          name: "Makkah"
        },
        {
          key: "quds.wav",
          name: "Quds"
        },
        {
          key: "madina.wav",
          name: "Madina"
        },
        {
          key: "malaysia.wav",
          name: "Malaysia"
        },
        {
          key: "brunei.wav",
          name: "Brunei Dar Assalam"
        }
      ]
    },
    addLocation: {
      city_name: "City name",
      add_location: "Add location",
      cancel: "Cancel"
    },
    sideMenu: {
      history: "Cities history"
    },
    surah: {
      title: "The Holy Quran",
      noData: "Check your internet connexion",
      noData1: "then click here to start a learning program",
      startProgram: "Start a program"
    },
    program: {
      remind: "Remind me after",
      moqrie: "Select Moqrie",
      trans: "Select Translation",
      tafsir: "Select Tafsir",
      validate: "Validate",
      cancel: "Cancel",
      back: "Back",
      next: "Next",
      save: "Save learning program",
      canEdit: "You can edit this program later"
    },
    configQuran: {
      font: "Font",
      trans: "Show Translation",
      tafsir: "Show Tafsir",
      autoPlay: "Auto play",
      repeatInfinite: "repeat indefinitely",
      repeat: "Repeat",
      times: "times",
      validate: "validate"
    }
  },
  ar: {
    home: {
      clickToAdd: "اضغط هنا لإضافة مدينتك",
      outDatedData:
        "لا اتصال بالانترنيت. تفقد اتصالك بالانترنيت ثم اضغط على زر إعادة التحميل",
      refresh: "تحديث",
      more: "المزيد",
      quran: "استمر في الحفظ",
      alerts: {
        ok: "موافق",
        unknown_city: {
          title: "مدينة غير معروفة",
          text: "لم نستطع العثور على هذه المدينة"
        },
        data_unavailable: {
          title: "البيانات غي",
          text: "المرجوا الاتصال بالانترنيت من أجل التحديث"
        }
      },
      toast: {
        non_connection:
          "لا انترنيت. هذه البيانات قد تم تحميلها من البيانات المسجلة",
        not_connected:
          "لا انترنيت. هذه البيانات قد تكون قديمة. المرجوا الاتصال بالانترنيت من أجل التحديث"
      }
    },
    config: {
      title: "الاعدادات",
      general: "إعدادات عامة",
      languages: "اللغات",
      date_time: "إعدادات الوقت والتاريخ",
      daylight: "التوقيت الصيفي",
      adjust_hijri: "تعديل التقويم الهجري",
      unit_system: "إعدادات نظام الوحدات",
      unit: "نظام الوحدات",
      athan: "إعدادات الأذان",
      calc_method: "طريقة الحساب",
      madhab: "المذهب",
      athan_audio: "صوت الآذان",
      listen: "استمع",
      stop: "إيقاف",
      notif_prayers: "الذكير بالصلوات التالية",
      notif_before: "تذكير قبل س دقيقة",
      validate: "حفظ التغييرات",
      toast: {
        updated: "نم تحديث الاعدادات"
      },
      methods: {
        MuslimWorldLeague: "رابطة العالم الإسلامي",
        Egyptian: "الهيئة المصرية العامة للمساحة",
        Karachi: "جامعة العلوم الإسلامية بكراتشي",
        UmmAlQura: "جامعة أم القرى",
        Gulf: "الخليج العربي",
        Qatar: "دولة قطر",
        Kuwait: "وزارة الأوقاف والشؤون الإسلامية في الكويت",
        MoonsightingCommittee: "لجنة مراقبة الهلال",
        NorthAmerica: "الجمعية الإسلامية لأمريكا الشمالية"
      },
      madhabs: [
        {
          key: "Shafi",
          name: "الشافعي"
        },
        {
          key: "Hanafi",
          name: "الحنفي"
        }
      ],
      prayers: [
        {
          key: "fajr",
          name: "الفجر"
        },
        {
          key: "sunrise",
          name: "الشروق"
        },
        {
          key: "dhuhr",
          name: "الظهر"
        },
        {
          key: "asr",
          name: "العصر"
        },
        {
          key: "maghrib",
          name: "المغرب"
        },
        {
          key: "isha",
          name: "العشاء"
        }
      ],
      athans: [
        {
          key: "mekkah.wav",
          name: "مكة"
        },
        {
          key: "quds.wav",
          name: "القدس"
        },
        {
          key: "madina.wav",
          name: "المدينة المنورة"
        },
        {
          key: "malaysia.wav",
          name: "ماليزيا"
        },
        {
          key: "brunei.wav",
          name: "بروناي, دار السلام"
        }
      ]
    },
    addLocation: {
      city_name: "اسم المدينة باللاتينية",
      add_location: "إضافة",
      cancel: "إلغاء"
    },
    sideMenu: {
      history: "أرشيف المدن"
    },
    surah: {
      title: "القرآن الكريم",
      noData: "تفقد اتصالك بالانترنيت",
      noData1: "ثم اضغط على الزر لبدء برنامج للحفظ",
      startProgram: "بدء برنامج الحفظ"
    },
    program: {
      remind: "ذكرني بعد صلاة",
      moqrie: "اختر المقرء",
      trans: "اختر الترجمة",
      tafsir: "اختر التفسير",
      validate: "حفظ",
      cancel: "إلغاء",
      back: "عودة",
      next: "التالي",
      save: "حفظ برنامج القراءة",
      canEdit: "يمكنك تغيير هذه الاعدادات في أي وقت"
    },
    configQuran: {
      font: "الخط",
      trans: "إظهار الترجمة",
      tafsir: "إظهار التفسير",
      autoPlay: "تشغيل تلقائي",
      repeatInfinite: "نكرار لا محدود",
      repeat: "Repeat",
      times: "times",
      validate: "حفظ"
    }
  }
};

export default langs;
