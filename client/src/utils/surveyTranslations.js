export const surveyConfig = [
  {
    "id": "q_0_collector",
    "key": "new_q_collector",
    "type": "single_select",
    "label": {
      "en": "Data Collector Name",
      "hi": "डेटा कलेक्टर का नाम",
      "gu": "ડેટા કલેક્શન કરનારનું નામ"
    },
    "options": [
      {
        "en": "Manan Pandey",
        "hi": "मनन पांडे",
        "gu": "મનન પાંડે"
      },
      {
        "en": "Manas Vinod",
        "hi": "मनस विनोद",
        "gu": "મનસ વિનોદ"
      },
      {
        "en": "Aradhya Garg",
        "hi": "आराध्या गर्ग",
        "gu": "આરાધ્યા ગર્ગ"
      },
      {
        "en": "Shreyas Das",
        "hi": "श्रेयस दास",
        "gu": "શ્રેયસ દાસ"
      },
      {
        "en": "Devansh More",
        "hi": "देवांश मोरे",
        "gu": "દેવાંશ મોરે"
      },
      {
        "en": "Namit Bhatia",
        "hi": "नमित भाटिया",
        "gu": "નમિત ભાટિયા"
      }
    ]
  },
  {
    "id": "q_0_farmer",
    "key": "new_q_farmer",
    "type": "text",
    "label": {
      "en": "Farmer Name / ID",
      "hi": "किसान का नाम / आईडी",
      "gu": "ખેડૂતનું નામ / ID"
    }
  },
  {
    "id": "q_0_location",
    "key": "new_q_location",
    "type": "text",
    "label": {
      "en": "Location (State/Village)",
      "hi": "स्थान (राज्य/गाँव)",
      "gu": "સ્થાન (રાજ્ય/ગામ)"
    }
  },
  {
    "id": "q_1",
    "type": "group",
    "label": {
      "en": "1. Which crop are we mapping, and how much land is used?",
      "hi": "1. हम किस फसल की मैपिंग कर रहे हैं, और कितनी जमीन का उपयोग किया जा रहा है?",
      "gu": "1. આપણે કયા પાકનું મેપિંગ કરી રહ્યા છીએ, અને કેટલી જમીનનો ઉપયોગ થાય છે?"
    },
    "subfields": [
      {
        "key": "new_q_1_crop",
        "en": "Crop Name",
        "hi": "फसल का नाम",
        "gu": "પાકનું નામ"
      },
      {
        "key": "new_q_1_land",
        "en": "Land Used (acre/hectare)",
        "hi": "उपयोग की गई भूमि (एकड़/हेक्टेयर)",
        "gu": "વપરાયેલ જમીન (એકર/હેક્ટર)"
      }
    ]
  },
  {
    "id": "q_2",
    "key": "new_q_2",
    "type": "single_select",
    "label": {
      "en": "2. Is the land OWNED, RENTED, or MIXED?",
      "hi": "2. क्या जमीन आपकी है (OWNED), किराए पर है (RENTED), या दोनों (MIXED)?",
      "gu": "2. શું જમીન તમારી પોતાની છે (OWNED), ભાડે લીધેલી છે (RENTED), કે મિશ્ર (MIXED)?"
    },
    "options": [
      {
        "en": "Owned",
        "hi": "अपनी (Owned)",
        "gu": "પોતાની (Owned)"
      },
      {
        "en": "Rented",
        "hi": "किराए पर (Rented)",
        "gu": "ભાડે લીધેલી (Rented)"
      },
      {
        "en": "Mixed",
        "hi": "दोनों (Mixed)",
        "gu": "મિશ્ર (Mixed)"
      }
    ]
  },
  {
    "id": "q_2_details",
    "key": "new_q_2_details",
    "type": "text",
    "dependsOn": {
      "key": "new_q_2",
      "values": [
        "Rented",
        "Mixed"
      ]
    },
    "label": {
      "en": "→ If RENTED/MIXED — what is the rent amount, and how/when is it paid?",
      "hi": "→ यदि किराए पर/दोनों है — किराए की राशि क्या है, और इसका भुगतान कैसे/कब किया जाता है?",
      "gu": "→ જો ભાડે લીધેલી/મિશ્ર હોય — ભાડાની રકમ કેટલી છે, અને તે કેવી રીતે/ક્યારે ચૂકવવામાં આવે છે?"
    }
  },
  {
    "id": "q_3",
    "key": "new_q_3",
    "type": "text",
    "label": {
      "en": "3. How long does this crop take from sowing to harvest?",
      "hi": "3. इस फसल को बुवाई से कटाई तक कितना समय लगता है?",
      "gu": "3. આ પાકને વાવણીથી કાપણી સુધી કેટલો સમય લાગે છે?"
    }
  },
  {
    "id": "q_4",
    "type": "group",
    "label": {
      "en": "4. What seed/variety is used, how much, and total seed cost?",
      "hi": "4. कौन सा बीज/किस्म उपयोग किया जाता है, कितना, और बीज की कुल लागत क्या है?",
      "gu": "4. કયું બિયારણ/જાત વપરાય છે, કેટલું, અને બિયારણનો કુલ ખર્ચ કેટલો છે?"
    },
    "subfields": [
      {
        "key": "new_q_4_variety",
        "en": "Seed / Variety",
        "hi": "बीज / किस्म",
        "gu": "બિયારણ / જાત"
      },
      {
        "key": "new_q_4_qty",
        "en": "Quantity",
        "hi": "मात्रा",
        "gu": "જથ્થો"
      },
      {
        "key": "new_q_4_cost",
        "en": "Total Seed Cost",
        "hi": "कुल बीज लागत",
        "gu": "કુલ બિયારણ ખર્ચ"
      }
    ]
  },
  {
    "id": "q_5",
    "key": "new_q_5",
    "type": "single_select",
    "label": {
      "en": "5a. Is the work done by FAMILY, HIRED labour, MACHINE, or a mix?",
      "hi": "5a. क्या काम परिवार (FAMILY), किराए के मजदूरों (HIRED), मशीन (MACHINE), या मिश्रित (Mix) रूप से किया जाता है?",
      "gu": "5a. શું કામ પરિવાર (FAMILY), ભાડે રાખેલા મજૂરો (HIRED), મશીન (MACHINE), કે મિશ્ર (Mix) દ્વારા કરવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Family",
        "hi": "परिवार (Family)",
        "gu": "પરિવાર (Family)"
      },
      {
        "en": "Hired",
        "hi": "किराए के मजदूर (Hired)",
        "gu": "ભાડે રાખેલા મજૂરો (Hired)"
      },
      {
        "en": "Machine",
        "hi": "मशीन (Machine)",
        "gu": "મશીન (Machine)"
      },
      {
        "en": "Mix",
        "hi": "मिश्रित (Mix)",
        "gu": "મિશ્ર (Mix)"
      }
    ]
  },
  {
    "id": "q_5_details",
    "type": "group",
    "label": {
      "en": "5b. Labour/Machine details (person-days, wage/rate, total cost)",
      "hi": "5b. श्रम/मशीन का विवरण (व्यक्ति-दिन, मजदूरी/दर, कुल लागत)",
      "gu": "5b. મજૂરી/મશીનની વિગતો (વ્યક્તિ-દિવસો, વેતન/દર, કુલ ખર્ચ)"
    },
    "subfields": [
      {
        "key": "new_q_5_days",
        "en": "Person-days (Family/Hired)",
        "hi": "व्यक्ति-दिन",
        "gu": "વ્યક્તિ-દિવસો"
      },
      {
        "key": "new_q_5_wage",
        "en": "Wage/Rate per day",
        "hi": "मजदूरी/दर",
        "gu": "વેતન/દર"
      },
      {
        "key": "new_q_5_total",
        "en": "Total Cost",
        "hi": "कुल लागत",
        "gu": "કુલ ખર્ચ"
      }
    ]
  },
  {
    "id": "q_6",
    "type": "group",
    "label": {
      "en": "6. What are the major inputs used besides seed (fertilizer, pesticide, etc.) and their respective costs?",
      "hi": "6. बीज के अलावा प्रमुख इनपुट (उर्वरक, कीटनाशक आदि) क्या हैं और उनकी संबंधित लागत क्या है?",
      "gu": "6. બિયારણ સિવાય વપરાતા મુખ્ય ઇનપુટ્સ (ખાતર, જંતુનાશક વગેરે) કયા છે અને તેમના સંબંધિત ખર્ચ કેટલા છે?"
    },
    "subfields": [
      {
        "key": "new_q_6_inputs",
        "en": "Names of Inputs Used",
        "hi": "उपयोग किए गए इनपुट के नाम",
        "gu": "વપરાયેલ ઇનપુટ્સના નામ"
      },
      {
        "key": "new_q_6_cost",
        "en": "Respective Costs",
        "hi": "संबंधित लागत",
        "gu": "સંબંધિત ખર્ચ"
      }
    ]
  },
  {
    "id": "q_7",
    "key": "new_q_7",
    "type": "single_select",
    "label": {
      "en": "7. Are inputs bought with CASH or CREDIT?",
      "hi": "7. क्या इनपुट नकद (CASH) या उधार (CREDIT) में खरीदे जाते हैं?",
      "gu": "7. શું ઇનપુટ્સ રોકડેથી (CASH) કે ઉધાર (CREDIT) ખરીદવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Cash",
        "hi": "नकद (Cash)",
        "gu": "રોકડેથી (Cash)"
      },
      {
        "en": "Credit",
        "hi": "उधार (Credit)",
        "gu": "ઉધાર (Credit)"
      }
    ]
  },
  {
    "id": "q_7_details",
    "type": "group",
    "dependsOn": {
      "key": "new_q_7",
      "values": [
        "Credit"
      ]
    },
    "label": {
      "en": "→ If CREDIT — who provides it, and what is the interest/extra cost and repayment timing?",
      "hi": "→ यदि उधार (CREDIT) — यह कौन प्रदान करता है, ब्याज/अतिरिक्त लागत क्या है और चुकाने का समय क्या है?",
      "gu": "→ જો ઉધાર (CREDIT) હોય — તો તે કોણ આપે છે, વ્યાજ/વધારાનો ખર્ચ કેટલો છે અને ચૂકવણીનો સમય કયો છે?"
    },
    "subfields": [
      {
        "key": "new_q_7_provider",
        "en": "Who provides it?",
        "hi": "कौन प्रदान करता है?",
        "gu": "કોણ આપે છે?"
      },
      {
        "key": "new_q_7_interest",
        "en": "Interest/Extra Cost",
        "hi": "ब्याज/अतिरिक्त लागत",
        "gu": "વ્યાજ/વધારાનો ખર્ચ"
      },
      {
        "key": "new_q_7_repayment",
        "en": "Repayment Timing",
        "hi": "चुकाने का समय",
        "gu": "ચૂકવણીનો સમય"
      }
    ]
  },
  {
    "id": "q_8",
    "type": "group",
    "label": {
      "en": "8. What is the irrigation source, and is it SELF-MANAGED or PAID? What is the total irrigation cost?",
      "hi": "8. सिंचाई का स्रोत क्या है, और क्या यह स्व-प्रबंधित है या भुगतान किया गया है? कुल सिंचाई लागत क्या है?",
      "gu": "8. સિંચાઈનો સ્ત્રોત કયો છે, અને શું તે સ્વ-સંચાલિત છે કે ચૂકવણી આધારિત? કુલ સિંચાઈ ખર્ચ કેટલો છે?"
    },
    "subfields": [
      {
        "key": "new_q_8_source",
        "en": "Irrigation Source",
        "hi": "सिंचाई स्रोत",
        "gu": "સિંચાઈનો સ્ત્રોત"
      },
      {
        "key": "new_q_8_type",
        "en": "Self-Managed or Paid",
        "hi": "स्व-प्रबंधित या भुगतान",
        "gu": "સ્વ-સંચાલિત કે ચૂકવણી"
      },
      {
        "key": "new_q_8_cost",
        "en": "Total Cost",
        "hi": "कुल लागत",
        "gu": "કુલ ખર્ચ"
      }
    ]
  },
  {
    "id": "q_9",
    "key": "new_q_9",
    "type": "text",
    "label": {
      "en": "9. Before planting, how much money is needed to start this crop?",
      "hi": "9. बुवाई से पहले, इस फसल को शुरू करने के लिए कितने पैसे की आवश्यकता होती है?",
      "gu": "9. વાવણી પહેલાં, આ પાક શરૂ કરવા માટે કેટલા પૈસાની જરૂર પડે છે?"
    }
  },
  {
    "id": "q_10",
    "type": "group",
    "label": {
      "en": "10. After planting, at what later stage(s) is more money needed — give amount + approximate timing for each.",
      "hi": "10. बुवाई के बाद, किस बाद के चरण में अधिक पैसे की आवश्यकता होती है — प्रत्येक के लिए राशि + अनुमानित समय बताएं।",
      "gu": "10. વાવણી પછી, કયા પછીના તબક્કે વધુ પૈસાની જરૂર પડે છે — દરેક માટે રકમ + અંદાજિત સમય જણાવો."
    },
    "subfields": [
      {
        "key": "new_q_10_stage",
        "en": "Later Stage(s)",
        "hi": "बाद का चरण",
        "gu": "પછીના તબક્કા"
      },
      {
        "key": "new_q_10_amount",
        "en": "Amount Needed",
        "hi": "आवश्यक राशि",
        "gu": "જરૂરી રકમ"
      },
      {
        "key": "new_q_10_timing",
        "en": "Approximate Timing",
        "hi": "अनुमानित समय",
        "gu": "અંદાજિત સમય"
      }
    ]
  },
  {
    "id": "q_11",
    "key": "new_q_11",
    "type": "single_select",
    "label": {
      "en": "11. Where does this money come from?",
      "hi": "11. यह पैसा कहाँ से आता है?",
      "gu": "11. આ પૈસા ક્યાંથી આવે છે?"
    },
    "options": [
      {
        "en": "Own Money",
        "hi": "अपना पैसा",
        "gu": "પોતાના પૈસા"
      },
      {
        "en": "Bank",
        "hi": "बैंक",
        "gu": "બેંક"
      },
      {
        "en": "Moneylender",
        "hi": "साहूकार",
        "gu": "શાહુકાર"
      },
      {
        "en": "Trader-Input Credit",
        "hi": "व्यापारी-इनपुट उधार",
        "gu": "વેપારી-ઇનપુટ ઉધાર"
      },
      {
        "en": "Family",
        "hi": "परिवार",
        "gu": "પરિવાર"
      },
      {
        "en": "Other",
        "hi": "अन्य",
        "gu": "અન્ય"
      }
    ]
  },
  {
    "id": "q_11_details",
    "type": "group",
    "dependsOn": {
      "key": "new_q_11",
      "values": [
        "Bank",
        "Moneylender",
        "Trader-Input Credit",
        "Family",
        "Other"
      ]
    },
    "label": {
      "en": "→ If borrowed — how much, at what interest/finance cost, and when is it repaid?",
      "hi": "→ यदि उधार लिया है — कितना, किस ब्याज/वित्त लागत पर, और इसे कब चुकाया जाता है?",
      "gu": "→ જો ઉછીના લીધા હોય — તો કેટલા, કેટલા વ્યાજ/નાણાકીય ખર્ચ પર, અને તે ક્યારે ચૂકવવામાં આવે છે?"
    },
    "subfields": [
      {
        "key": "new_q_11_amount",
        "en": "Amount Borrowed",
        "hi": "उधार ली गई राशि",
        "gu": "ઉછીની લીધેલી રકમ"
      },
      {
        "key": "new_q_11_interest",
        "en": "Interest / Finance Cost",
        "hi": "ब्याज / वित्त लागत",
        "gu": "વ્યાજ / નાણાકીય ખર્ચ"
      },
      {
        "key": "new_q_11_timing",
        "en": "When is it repaid?",
        "hi": "कब चुकाया जाता है?",
        "gu": "ક્યારે ચૂકવવામાં આવે છે?"
      }
    ]
  },
  {
    "id": "q_12",
    "type": "group",
    "label": {
      "en": "12. What is the single biggest thing that can reduce yield or raise cost for this crop, and roughly how much money/yield can be lost?",
      "hi": "12. इस फसल की उपज को कम करने या लागत बढ़ाने वाली सबसे बड़ी चीज़ क्या है, और लगभग कितना पैसा/उपज नष्ट हो सकती है?",
      "gu": "12. આ પાકની ઉપજ ઘટાડતી કે ખર્ચ વધારતી સૌથી મોટી બાબત કઈ છે, અને અંદાજે કેટલા પૈસા/ઉપજનું નુકસાન થઈ શકે છે?"
    },
    "subfields": [
      {
        "key": "new_q_12_risk",
        "en": "Biggest Risk Factor",
        "hi": "सबसे बड़ा जोखिम",
        "gu": "સૌથી મોટું જોખમ"
      },
      {
        "key": "new_q_12_loss",
        "en": "Estimated Loss (Money/Yield)",
        "hi": "अनुमानित नुकसान",
        "gu": "અંદાજિત નુકસાન"
      }
    ]
  },
  {
    "id": "q_13",
    "type": "group",
    "label": {
      "en": "13. What is the total harvesting cost, and how much crop is normally produced vs. lost/damaged before sale?",
      "hi": "13. कुल कटाई लागत क्या है, और बिक्री से पहले आमतौर पर कितनी फसल का उत्पादन बनाम नुकसान/क्षति होती है?",
      "gu": "13. કુલ કાપણી ખર્ચ કેટલો છે, અને વેચાણ પહેલાં સામાન્ય રીતે કેટલો પાક ઉત્પન્ન થાય છે વિરુદ્ધ કેટલો નાશ/નુકસાન પામે છે?"
    },
    "subfields": [
      {
        "key": "new_q_13_cost",
        "en": "Total Harvest Cost",
        "hi": "कुल कटाई लागत",
        "gu": "કુલ કાપણી ખર્ચ"
      },
      {
        "key": "new_q_13_produced",
        "en": "Normally Produced Quantity",
        "hi": "सामान्य उत्पादन मात्रा",
        "gu": "સામાન્ય ઉત્પાદન જથ્થો"
      },
      {
        "key": "new_q_13_lost",
        "en": "Lost/Damaged Quantity",
        "hi": "नुकसान/क्षति मात्रा",
        "gu": "નુકસાન/ક્ષતિ જથ્થો"
      }
    ]
  },
  {
    "id": "q_14",
    "type": "group",
    "label": {
      "en": "14. What does transport to the first sale point cost, and who arranges it?",
      "hi": "14. पहले बिक्री बिंदु तक परिवहन का खर्च क्या है, और इसकी व्यवस्था कौन करता है?",
      "gu": "14. પ્રથમ વેચાણ બિંદુ સુધી પરિવહનનો ખર્ચ કેટલો છે, અને તેની વ્યવસ્થા કોણ કરે છે?"
    },
    "subfields": [
      {
        "key": "new_q_14_cost",
        "en": "Transport Cost",
        "hi": "परिवहन खर्च",
        "gu": "પરિવહન ખર્ચ"
      },
      {
        "key": "new_q_14_who",
        "en": "Who Arranges Transport?",
        "hi": "कौन व्यवस्था करता है?",
        "gu": "કોણ વ્યવસ્થા કરે છે?"
      }
    ]
  },
  {
    "id": "q_15",
    "key": "new_q_15",
    "type": "single_select",
    "label": {
      "en": "15. Is the crop stored before sale?",
      "hi": "15. क्या फसल को बिक्री से पहले स्टोर किया जाता है?",
      "gu": "15. શું પાકને વેચાણ પહેલાં સંગ્રહિત કરવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Yes",
        "hi": "हाँ",
        "gu": "હા"
      },
      {
        "en": "No",
        "hi": "नहीं",
        "gu": "ના"
      }
    ]
  },
  {
    "id": "q_15_details",
    "type": "group",
    "dependsOn": {
      "key": "new_q_15",
      "values": [
        "Yes"
      ]
    },
    "label": {
      "en": "→ If yes — where, for how long, and at what cost?",
      "hi": "→ यदि हाँ — कहाँ, कितने समय के लिए, और किस लागत पर?",
      "gu": "→ જો હા — તો ક્યાં, કેટલા સમય માટે, અને કેટલા ખર્ચે?"
    },
    "subfields": [
      {
        "key": "new_q_15_where",
        "en": "Where",
        "hi": "कहाँ",
        "gu": "ક્યાં"
      },
      {
        "key": "new_q_15_duration",
        "en": "How Long",
        "hi": "कितने समय",
        "gu": "કેટલો સમય"
      },
      {
        "key": "new_q_15_cost",
        "en": "Cost",
        "hi": "लागत",
        "gu": "ખર્ચ"
      }
    ]
  },
  {
    "id": "q_16",
    "type": "group",
    "label": {
      "en": "16. Who buys the crop, and how is the price decided?",
      "hi": "16. फसल कौन खरीदता है, और कीमत कैसे तय की जाती है?",
      "gu": "16. પાક કોણ ખરીદે છે, અને કિંમત કેવી રીતે નક્કી થાય છે?"
    },
    "subfields": [
      {
        "key": "new_q_16_buyer",
        "en": "Buyer (mandi/trader/direct...)",
        "hi": "खरीददार",
        "gu": "ખરીદનાર"
      },
      {
        "key": "new_q_16_price_mech",
        "en": "How is price decided?",
        "hi": "कीमत कैसे तय होती है?",
        "gu": "કિંમત કેવી રીતે નક્કી થાય છે?"
      }
    ]
  },
  {
    "id": "q_17",
    "type": "group",
    "label": {
      "en": "17. What price was expected, and what price was actually received?",
      "hi": "17. किस कीमत की उम्मीद थी, और वास्तव में कितनी कीमत मिली?",
      "gu": "17. કેટલી કિંમતની અપેક્ષા હતી, અને વાસ્તવમાં કેટલી કિંમત મળી?"
    },
    "subfields": [
      {
        "key": "new_q_17_expected",
        "en": "Expected Price",
        "hi": "उम्मीद की गई कीमत",
        "gu": "અપેક્ષિત કિંમત"
      },
      {
        "key": "new_q_17_actual",
        "en": "Actual Received Price",
        "hi": "वास्तविक प्राप्त कीमत",
        "gu": "વાસ્તવિક પ્રાપ્ત કિંમત"
      }
    ]
  },
  {
    "id": "q_18",
    "type": "group",
    "label": {
      "en": "18. Are there commissions, deductions, grading or market fees? How much in total?",
      "hi": "18. क्या कमीशन, कटौती, या बाजार शुल्क हैं? कुल कितना?",
      "gu": "18. શું કમિશન, કપાત, કે બજાર ફી છે? કુલ કેટલી?"
    },
    "subfields": [
      {
        "key": "new_q_18_fees_exist",
        "en": "Types of Fees/Deductions",
        "hi": "शुल्क के प्रकार",
        "gu": "ફી ના પ્રકાર"
      },
      {
        "key": "new_q_18_total",
        "en": "Total Amount",
        "hi": "कुल राशि",
        "gu": "કુલ રકમ"
      }
    ]
  },
  {
    "id": "q_19",
    "type": "group",
    "label": {
      "en": "19. How long after sale is the money actually received? Has payment ever been delayed or reduced?",
      "hi": "19. बिक्री के कितने समय बाद पैसा वास्तव में प्राप्त होता है? क्या भुगतान में कभी देरी हुई है?",
      "gu": "19. વેચાણના કેટલા સમય પછી વાસ્તવમાં પૈસા મળે છે? શું ચૂકવણીમાં ક્યારેય વિલંબ થયો છે?"
    },
    "subfields": [
      {
        "key": "new_q_19_time",
        "en": "Time to receive money",
        "hi": "पैसे मिलने में समय",
        "gu": "પૈસા મળવાનો સમય"
      },
      {
        "key": "new_q_19_delayed",
        "en": "Delayed/Reduced? (Yes/No/Details)",
        "hi": "देरी या कटौती? (विवरण)",
        "gu": "વિલંબ કે ઘટાડો? (વિગતો)"
      }
    ]
  },
  {
    "id": "q_20",
    "key": "new_q_20",
    "type": "text",
    "label": {
      "en": "20. If crop capital were provided without a fixed-interest loan, would you consider using it — why or why not?",
      "hi": "20. यदि बिना निश्चित ब्याज वाले ऋण के फसल पूंजी प्रदान की जाए, तो क्या आप इसका उपयोग करने पर विचार करेंगे — क्यों या क्यों नहीं?",
      "gu": "20. જો નિશ્ચિત વ્યાજની લોન વિના પાક માટે મૂડી પૂરી પાડવામાં આવે, તો શું તમે તેનો ઉપયોગ કરવાનું વિચારશો — શા માટે અથવા શા માટે નહીં?"
    }
  },
  {
    "id": "q_notes",
    "key": "new_q_notes",
    "type": "textarea",
    "label": {
      "en": "Notes",
      "hi": "टिप्पणियाँ (Notes)",
      "gu": "નોંધો (Notes)"
    }
  }
];

export const staticText = {
  "title": {
    "en": "FARMER COST & MONEY-FLOW QUESTIONNAIRE",
    "hi": "किसान लागत और धन-प्रवाह प्रश्नावली",
    "gu": "ખેડૂત ખર્ચ અને નાણાં-પ્રવાહ પ્રશ્નાવલી"
  },
  "instruction1": {
    "en": "Ask about the real crop just grown. Skip any branch that doesn't apply. Record ₹, quantity and timing. Family labour counts even if unpaid.",
    "hi": "अभी उगाई गई वास्तविक फसल के बारे में पूछें। लागू न होने वाली किसी भी शाखा को छोड़ दें। ₹, मात्रा और समय दर्ज करें। पारिवारिक श्रम को भी गिनें भले ही उसका भुगतान न किया गया हो।",
    "gu": "હમણાં જ ઉગાડવામાં આવેલા વાસ્તવિક પાક વિશે પૂછો. લાગુ ન પડતી કોઈપણ શાખાને છોડી દો. ₹, જથ્થો અને સમય નોંધો. પારિવારિક મજૂરીને પણ ગણો ભલે તે ચૂકવવામાં ન આવી હોય."
  },
  "instruction2": {
    "en": "Condensed field version — 25 to 30 farmer interviews. Target time: 10-12 minutes per farmer.",
    "hi": "संक्षिप्त फ़ील्ड संस्करण — 25 से 30 किसान साक्षात्कार। लक्ष्य समय: 10-12 मिनट प्रति किसान।",
    "gu": "સંક્ષિપ્ત ફિલ્ડ આવૃત્તિ — 25 થી 30 ખેડૂતોના ઇન્ટરવ્યુ. લક્ષ્ય સમય: ખેડૂત દીઠ 10-12 મિનિટ."
  }
};
