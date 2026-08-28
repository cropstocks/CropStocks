export const surveyConfig = [
  {
    "id": "q_0_collector",
    "key": "new_q_collector",
    "type": "single_select",
    "label": {
      "en": "Data Collector Name",
      "hi": "Data Collector ka Name",
      "gu": "ડેટા કલેક્શન કરનારનું નામ"
    },
    "options": [
      {
        "en": "Manan Pandey",
        "hi": "Manan Pandey",
        "gu": "મનન પાંડે"
      },
      {
        "en": "Manas Vinod",
        "hi": "Manas Vinod",
        "gu": "મનસ વિનોદ"
      },
      {
        "en": "Aradhya Garg",
        "hi": "Aradhya Garg",
        "gu": "આરાધ્યા ગર્ગ"
      },
      {
        "en": "Shreyas Das",
        "hi": "Shreyas Das",
        "gu": "શ્રેયસ દાસ"
      },
      {
        "en": "Devansh More",
        "hi": "Devansh More",
        "gu": "દેવાંશ મોરે"
      },
      {
        "en": "Namit Bhatia",
        "hi": "Namit Bhatia",
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
      "hi": "Farmer ka Name / ID",
      "gu": "ખેડૂતનું નામ / ID"
    }
  },
  {
    "id": "q_0_location",
    "key": "new_q_location",
    "type": "text",
    "label": {
      "en": "Location (State/Village)",
      "hi": "Location (State/Gaon)",
      "gu": "સ્થાન (રાજ્ય/ગામ)"
    }
  },
  {
    "id": "q_1",
    "type": "group",
    "label": {
      "en": "1. Which crop are we mapping, and how much land is used?",
      "hi": "1. Aap kaun si fasal (crop) ki mapping kar rahe hain, aur uske liye kitni zameen use ho rahi hai?",
      "gu": "1. આપણે કયા પાકનું મેપિંગ કરી રહ્યા છીએ, અને કેટલી જમીનનો ઉપયોગ થાય છે?"
    },
    "subfields": [
      {
        "key": "new_q_1_crop",
        "en": "Crop Name",
        "hi": "Fasal ka Name (Crop)",
        "gu": "પાકનું નામ"
      },
      {
        "key": "new_q_1_land",
        "en": "Land Used (acre/hectare)",
        "hi": "Kitni zameen use hui (Acre/Hectare)",
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
      "hi": "2. Yeh zameen aapki khud ki hai (Owned), rent par li hai (Rented), ya dono hai (Mixed)?",
      "gu": "2. શું જમીન તમારી પોતાની છે (OWNED), ભાડે લીધેલી છે (RENTED), કે મિશ્ર (MIXED)?"
    },
    "options": [
      {
        "en": "Owned",
        "hi": "Apni khud ki hai (Owned)",
        "gu": "પોતાની (Owned)"
      },
      {
        "en": "Rented",
        "hi": "Rent par li hai (Rented)",
        "gu": "ભાડે લીધેલી (Rented)"
      },
      {
        "en": "Mixed",
        "hi": "Dono hai (Mixed)",
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
      "hi": "→ Agar zameen Rent par hai ya dono hai — Rent ka kitna paisa dena hota hai, aur payment kaise/kab karte hain?",
      "gu": "→ જો ભાડે લીધેલી/મિશ્ર હોય — ભાડાની રકમ કેટલી છે, અને તે કેવી રીતે/ક્યારે ચૂકવવામાં આવે છે?"
    }
  },
  {
    "id": "q_3",
    "key": "new_q_3",
    "type": "text",
    "label": {
      "en": "3. How long does this crop take from sowing to harvest?",
      "hi": "3. Fasal ko bone (sowing) se lekar katne (harvest) tak kitna time lagta hai?",
      "gu": "3. આ પાકને વાવણીથી કાપણી સુધી કેટલો સમય લાગે છે?"
    }
  },
  {
    "id": "q_4",
    "type": "group",
    "label": {
      "en": "4. What seed/variety is used, how much, and total seed cost?",
      "hi": "4. Aap kaun sa beej (seed)/variety use karte hain, kitni quantity me, aur beej ka total kharch (cost) kitna aata hai?",
      "gu": "4. કયું બિયારણ/જાત વપરાય છે, કેટલું, અને બિયારણનો કુલ ખર્ચ કેટલો છે?"
    },
    "subfields": [
      {
        "key": "new_q_4_variety",
        "en": "Seed / Variety",
        "hi": "Beej / Variety",
        "gu": "બિયારણ / જાત"
      },
      {
        "key": "new_q_4_qty",
        "en": "Quantity",
        "hi": "Quantity (Beej ki matra)",
        "gu": "જથ્થો"
      },
      {
        "key": "new_q_4_cost",
        "en": "Total Seed Cost",
        "hi": "Beej ka total kharch (Cost)",
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
      "hi": "5a. Kheti ka kaam kaise hota hai — family ke log karte hain, rent ke mazdoor (Hired labour) karte hain, machine se hota hai, ya dono mixed tarike se hota hai?",
      "gu": "5a. શું કામ પરિવાર (FAMILY), ભાડે રાખેલા મજૂરો (HIRED), મશીન (MACHINE), કે મિશ્ર (Mix) દ્વારા કરવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Family",
        "hi": "Parivar ya doston se (Family)",
        "gu": "પરિવાર (Family)"
      },
      {
        "en": "Hired",
        "hi": "Rent ke mazdoor (Hired)",
        "gu": "ભાડે રાખેલા મજૂરો (Hired)"
      },
      {
        "en": "Machine",
        "hi": "Machine se (Machine)",
        "gu": "મશીન (Machine)"
      },
      {
        "en": "Mix",
        "hi": "Dono mixed (Mix)",
        "gu": "મિશ્ર (Mix)"
      }
    ]
  },
  {
    "id": "q_5_labour",
    "type": "group",
    "label": {
      "en": "5b. Labour details (person-days, wage/rate, total cost)",
      "hi": "5b. Mazdooron (labour) ki details: kitne din kaam kiya, per day kya rate tha, aur total kitna kharch hua?",
      "gu": "5b. મજૂરીની વિગતો (વ્યક્તિ-દિવસો, વેતન/દર, કુલ ખર્ચ)"
    },
    "subfields": [
      {
        "key": "new_q_5_labour_days",
        "en": "Person-days (Family/Hired)",
        "hi": "Mazdooron ke total din (Person-days)",
        "gu": "વ્યક્તિ-દિવસો (પરિવાર/ભાડે)"
      },
      {
        "key": "new_q_5_labour_wage",
        "en": "Wage/Rate per day",
        "hi": "Ek din ki mazdoori (Wage/Rate)",
        "gu": "વેતન/દર પ્રતિ દિવસ"
      },
      {
        "key": "new_q_5_labour_total",
        "en": "Total Labour Cost",
        "hi": "Mazdoori ka total kharch (Labour Cost)",
        "gu": "કુલ મજૂરી ખર્ચ"
      }
    ]
  },
  {
    "id": "q_5_machine",
    "type": "group",
    "label": {
      "en": "5c. Machine details (hours/days, rate, total cost)",
      "hi": "5c. Machine ki details: kitne ghante/din use kiya, per hour/day ka rate kya tha, aur total kitna kharch hua?",
      "gu": "5c. મશીનની વિગતો (કલાકો/દિવસો, દર, કુલ ખર્ચ)"
    },
    "subfields": [
      {
        "key": "new_q_5_machine_used",
        "en": "Machine Usage (Hours/Days)",
        "hi": "Machine kitne ghante/din chali",
        "gu": "મશીનનો ઉપયોગ (કલાકો/દિવસો)"
      },
      {
        "key": "new_q_5_machine_rate",
        "en": "Rate per hour/day",
        "hi": "Rate (per hour/day)",
        "gu": "દર પ્રતિ કલાક/દિવસ"
      },
      {
        "key": "new_q_5_machine_total",
        "en": "Total Machine Cost",
        "hi": "Machine ka total kharch (Cost)",
        "gu": "કુલ મશીન ખર્ચ"
      }
    ]
  },
  {
    "id": "q_6",
    "type": "group",
    "label": {
      "en": "6. What are the major inputs used besides seed (fertilizer, pesticide, etc.) and their respective costs?",
      "hi": "6. Beej (seed) ke alawa aur kya inputs use karte hain (jaise khad/fertilizer, dawai/pesticide) aur unka kitna kharch hota hai?",
      "gu": "6. બિયારણ સિવાય વપરાતા મુખ્ય ઇનપુટ્સ (ખાતર, જંતુનાશક વગેરે) કયા છે અને તેમના સંબંધિત ખર્ચ કેટલા છે?"
    },
    "subfields": [
      {
        "key": "new_q_6_inputs",
        "en": "Names of Inputs Used",
        "hi": "Inputs ke naam (Khad/Dawai)",
        "gu": "વપરાયેલ ઇનપુટ્સના નામ"
      },
      {
        "key": "new_q_6_cost",
        "en": "Respective Costs",
        "hi": "Inputs ka kharch (Cost)",
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
      "hi": "7. Khad-dawai (inputs) aap cash (nagad) me kharidte hain ya credit (udhaar) par?",
      "gu": "7. શું ઇનપુટ્સ રોકડેથી (CASH) કે ઉધાર (CREDIT) ખરીદવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Cash",
        "hi": "Cash me",
        "gu": "રોકડેથી (Cash)"
      },
      {
        "en": "Credit",
        "hi": "Udhaar/Credit par",
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
      "hi": "→ Agar udhaar (Credit) par liya hai — toh kaun deta hai, interest (byaj) kitna lagta hai aur paise kab tak chukane hote hain?",
      "gu": "→ જો ઉધાર (CREDIT) હોય — તો તે કોણ આપે છે, વ્યાજ/વધારાનો ખર્ચ કેટલો છે અને ચૂકવણીનો સમય કયો છે?"
    },
    "subfields": [
      {
        "key": "new_q_7_provider",
        "en": "Who provides it?",
        "hi": "Kaun deta hai (Provider)?",
        "gu": "કોણ આપે છે?"
      },
      {
        "key": "new_q_7_interest",
        "en": "Interest/Extra Cost",
        "hi": "Byaj/Extra cost (Interest)",
        "gu": "વ્યાજ/વધારાનો ખર્ચ"
      },
      {
        "key": "new_q_7_repayment",
        "en": "Repayment Timing",
        "hi": "Kab chukana hota hai?",
        "gu": "ચૂકવણીનો સમય"
      }
    ]
  },
  {
    "id": "q_8",
    "type": "group",
    "label": {
      "en": "8. What is the irrigation source, and is it SELF-MANAGED or PAID? What is the total irrigation cost?",
      "hi": "8. Sinchai (irrigation) ka source kya hai, aur kya yeh aapka apna hai (self-managed) ya paise dene hote hain (paid)? Total sinchai ka kharch kitna aata hai?",
      "gu": "8. સિંચાઈનો સ્ત્રોત કયો છે, અને શું તે સ્વ-સંચાલિત છે કે ચૂકવણી આધારિત? કુલ સિંચાઈ ખર્ચ કેટલો છે?"
    },
    "subfields": [
      {
        "key": "new_q_8_source",
        "en": "Irrigation Source",
        "hi": "Sinchai ka source (Kuan/Nahar/Tubewell)",
        "gu": "સિંચાઈનો સ્ત્રોત"
      },
      {
        "key": "new_q_8_type",
        "en": "Self-Managed or Paid",
        "hi": "Apna hai (Self-managed) ya Paid hai",
        "gu": "સ્વ-સંચાલિત કે ચૂકવણી"
      },
      {
        "key": "new_q_8_cost",
        "en": "Total Cost",
        "hi": "Sinchai ka total kharch (Cost)",
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
      "hi": "9. Fasal bone se pehle, shuruat me kaam chalu karne ke liye lagbhag kitne paise ki zaroorat hoti hai?",
      "gu": "9. વાવણી પહેલાં, આ પાક શરૂ કરવા માટે કેટલા પૈસાની જરૂર પડે છે?"
    }
  },
  {
    "id": "q_10",
    "type": "group",
    "label": {
      "en": "10. After planting, at what later stage(s) is more money needed — give amount + approximate timing for each.",
      "hi": "10. Beej bone ke baad, aage kis-kis stage par aur paise ki zaroorat padti hai — kitna amount aur kab (time) chahiye?",
      "gu": "10. વાવણી પછી, કયા પછીના તબક્કે વધુ પૈસાની જરૂર પડે છે — દરેક માટે રકમ + અંદાજિત સમય જણાવો."
    },
    "subfields": [
      {
        "key": "new_q_10_stage",
        "en": "Later Stage(s)",
        "hi": "Kaun si stage par",
        "gu": "પછીના તબક્કા"
      },
      {
        "key": "new_q_10_amount",
        "en": "Amount Needed",
        "hi": "Kitna paisa chahiye (Amount)",
        "gu": "જરૂરી રકમ"
      },
      {
        "key": "new_q_10_timing",
        "en": "Approximate Timing",
        "hi": "Kab chahiye (Timing/Month)",
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
      "hi": "11. Kheti ke liye yeh paisa kahan se aata hai?",
      "gu": "11. આ પૈસા ક્યાંથી આવે છે?"
    },
    "options": [
      {
        "en": "Own Money",
        "hi": "Apna khud ka paisa (Own money)",
        "gu": "પોતાના પૈસા"
      },
      {
        "en": "Bank",
        "hi": "Bank se",
        "gu": "બેંક"
      },
      {
        "en": "Moneylender",
        "hi": "Sahukar/Aadtiya se (Moneylender)",
        "gu": "શાહુકાર"
      },
      {
        "en": "Trader-Input Credit",
        "hi": "Vyapari se udhaar (Trader-Input credit)",
        "gu": "વેપારી-ઇનપુટ ઉધાર"
      },
      {
        "en": "Family",
        "hi": "Parivar ya doston se (Family)",
        "gu": "પરિવાર"
      },
      {
        "en": "Other",
        "hi": "Koyee aur jagah se (Other)",
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
      "hi": "→ Agar borrow/udhaar liya hai — toh kitna amount liya, kis byaj (interest) rate par, aur kab chukana hota hai?",
      "gu": "→ જો ઉછીના લીધા હોય — તો કેટલા, કેટલા વ્યાજ/નાણાકીય ખર્ચ પર, અને તે ક્યારે ચૂકવવામાં આવે છે?"
    },
    "subfields": [
      {
        "key": "new_q_11_amount",
        "en": "Amount Borrowed",
        "hi": "Kitna udhaar liya (Amount)",
        "gu": "ઉછીની લીધેલી રકમ"
      },
      {
        "key": "new_q_11_interest",
        "en": "Interest / Finance Cost",
        "hi": "Byaj/Interest rate",
        "gu": "વ્યાજ / નાણાકીય ખર્ચ"
      },
      {
        "key": "new_q_11_timing",
        "en": "When is it repaid?",
        "hi": "Kab chukana hota hai?",
        "gu": "ક્યારે ચૂકવવામાં આવે છે?"
      }
    ]
  },
  {
    "id": "q_12",
    "type": "group",
    "label": {
      "en": "12. What is the single biggest thing that can reduce yield or raise cost for this crop, and roughly how much money/yield can be lost?",
      "hi": "12. Is fasal ki paidawar (yield) kam hone ya kharch badhne ka sabse bada khatra/risk kya hota hai, aur usse lagbhag kitna nuksan ho sakta hai?",
      "gu": "12. આ પાકની ઉપજ ઘટાડતી કે ખર્ચ વધારતી સૌથી મોટી બાબત કઈ છે, અને અંદાજે કેટલા પૈસા/ઉપજનું નુકસાન થઈ શકે છે?"
    },
    "subfields": [
      {
        "key": "new_q_12_risk",
        "en": "Biggest Risk Factor",
        "hi": "Sabse bada khatra/risk (jaise keeda/mausam)",
        "gu": "સૌથી મોટું જોખમ"
      },
      {
        "key": "new_q_12_loss",
        "en": "Estimated Loss (Money/Yield)",
        "hi": "Nuksan ka andaza (Paisa ya Paidawar)",
        "gu": "અંદાજિત નુકસાન"
      }
    ]
  },
  {
    "id": "q_13",
    "type": "group",
    "label": {
      "en": "13. What is the total harvesting cost, and how much crop is normally produced vs. lost/damaged before sale?",
      "hi": "13. Fasal katne (harvesting) ka total kharch kitna aata hai, aur bechne se pehle lagbhag kitni paidawar hoti hai aur kitna nuksan/damage ho jata hai?",
      "gu": "13. કુલ કાપણી ખર્ચ કેટલો છે, અને વેચાણ પહેલાં સામાન્ય રીતે કેટલો પાક ઉત્પન્ન થાય છે વિરુદ્ધ કેટલો નાશ/નુકસાન પામે છે?"
    },
    "subfields": [
      {
        "key": "new_q_13_cost",
        "en": "Total Harvest Cost",
        "hi": "Katai ka total kharch (Harvest Cost)",
        "gu": "કુલ કાપણી ખર્ચ"
      },
      {
        "key": "new_q_13_produced",
        "en": "Normally Produced Quantity",
        "hi": "Aamtaur par paidawar kitni hoti hai (Quantity)",
        "gu": "સામાન્ય ઉત્પાદન જથ્થો"
      },
      {
        "key": "new_q_13_lost",
        "en": "Lost/Damaged Quantity",
        "hi": "Katai ke baad kitna nuksan/damage hota hai",
        "gu": "નુકસાન/ક્ષતિ જથ્થો"
      }
    ]
  },
  {
    "id": "q_14",
    "type": "group",
    "label": {
      "en": "14. What does transport to the first sale point cost, and who arranges it?",
      "hi": "14. Mandi ya pehle sale point tak fasal le jaane ka transport kharch kitna aata hai, aur transport ka arrangement kaun karta hai?",
      "gu": "14. પ્રથમ વેચાણ બિંદુ સુધી પરિવહનનો ખર્ચ કેટલો છે, અને તેની વ્યવસ્થા કોણ કરે છે?"
    },
    "subfields": [
      {
        "key": "new_q_14_cost",
        "en": "Transport Cost",
        "hi": "Transport ka kharch (Cost)",
        "gu": "પરિવહન ખર્ચ"
      },
      {
        "key": "new_q_14_who",
        "en": "Who Arranges Transport?",
        "hi": "Arrangement kaun karta hai (Aap ya Buyer)?",
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
      "hi": "15. Kya aap bechne se pehle fasal ko store (surakshit rakhna) karte hain?",
      "gu": "15. શું પાકને વેચાણ પહેલાં સંગ્રહિત કરવામાં આવે છે?"
    },
    "options": [
      {
        "en": "Yes",
        "hi": "Haan (Yes)",
        "gu": "હા"
      },
      {
        "en": "No",
        "hi": "Nahi (No)",
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
      "hi": "→ Agar haan — toh kahan store karte hain, kitne time ke liye, aur kitna kharch aata hai?",
      "gu": "→ જો હા — તો ક્યાં, કેટલા સમય માટે, અને કેટલા ખર્ચે?"
    },
    "subfields": [
      {
        "key": "new_q_15_where",
        "en": "Where",
        "hi": "Kahan (Storage place)",
        "gu": "ક્યાં"
      },
      {
        "key": "new_q_15_duration",
        "en": "How Long",
        "hi": "Kitne time ke liye",
        "gu": "કેટલો સમય"
      },
      {
        "key": "new_q_15_cost",
        "en": "Cost",
        "hi": "Store karne ka kharch (Cost)",
        "gu": "ખર્ચ"
      }
    ]
  },
  {
    "id": "q_16",
    "type": "group",
    "label": {
      "en": "16. Who buys the crop, and how is the price decided?",
      "hi": "16. Aapki fasal kaun kharidta hai, aur price kaise decide hota hai?",
      "gu": "16. પાક કોણ ખરીદે છે, અને કિંમત કેવી રીતે નક્કી થાય છે?"
    },
    "subfields": [
      {
        "key": "new_q_16_buyer",
        "en": "Buyer (mandi/trader/direct...)",
        "hi": "Khariddaar (jaise Mandi/Vyapari/Direct)",
        "gu": "ખરીદનાર"
      },
      {
        "key": "new_q_16_price_mech",
        "en": "How is price decided?",
        "hi": "Price kaise decide hota hai (Boli/Fix price)?",
        "gu": "કિંમત કેવી રીતે નક્કી થાય છે?"
      }
    ]
  },
  {
    "id": "q_17",
    "type": "group",
    "label": {
      "en": "17. What price was expected, and what price was actually received?",
      "hi": "17. Aapko kis rate/price ki umeed (expected) thi, aur sach me kya rate/price mila (actual)?",
      "gu": "17. કેટલી કિંમતની અપેક્ષા હતી, અને વાસ્તવમાં કેટલી કિંમત મળી?"
    },
    "subfields": [
      {
        "key": "new_q_17_expected",
        "en": "Expected Price",
        "hi": "Umeed kiya gaya rate (Expected)",
        "gu": "અપેક્ષિત કિંમત"
      },
      {
        "key": "new_q_17_actual",
        "en": "Actual Received Price",
        "hi": "Jo rate sach me mila (Actual)",
        "gu": "વાસ્તવિક પ્રાપ્ત કિંમત"
      }
    ]
  },
  {
    "id": "q_18",
    "type": "group",
    "label": {
      "en": "18. Are there commissions, deductions, grading or market fees? How much in total?",
      "hi": "18. Byaj/katauti (deduction), grading ya market fees lagti hai? Total kitna?",
      "gu": "18. શું કમિશન, કપાત, કે બજાર ફી છે? કુલ કેટલી?"
    },
    "subfields": [
      {
        "key": "new_q_18_fees_exist",
        "en": "Types of Fees/Deductions",
        "hi": "Fee/Katauti ka type",
        "gu": "ફી ના પ્રકાર"
      },
      {
        "key": "new_q_18_total",
        "en": "Total Amount",
        "hi": "Total kitna paisa (Amount)",
        "gu": "કુલ રકમ"
      }
    ]
  },
  {
    "id": "q_19",
    "type": "group",
    "label": {
      "en": "19. How long after sale is the money actually received? Has payment ever been delayed or reduced?",
      "hi": "19. Fasal bechne ke kitne din baad paisa sach me haath me aata hai? Kya payment me kabhi deri (delay) ya katauti (deduction) hui hai?",
      "gu": "19. વેચાણના કેટલા સમય પછી વાસ્તવમાં પૈસા મળે છે? શું ચૂકવણીમાં ક્યારેય વિલંબ થયો છે?"
    },
    "subfields": [
      {
        "key": "new_q_19_time",
        "en": "Time to receive money",
        "hi": "Paisa milne me kitna time lagta hai",
        "gu": "પૈસા મળવાનો સમય"
      },
      {
        "key": "new_q_19_delayed",
        "en": "Delayed/Reduced? (Yes/No/Details)",
        "hi": "Kabhi deri/katauti hui hai? (Yes/No/Details)",
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
      "hi": "20. Agar bina byaj (interest) wale loan ke, fasal ke liye capital (paisa) diya jaye, toh kya aap use lene ke baare me sochenge? Kyun ya kyun nahi?",
      "gu": "20. જો નિશ્ચિત વ્યાજની લોન વિના પાક માટે મૂડી પૂરી પાડવામાં આવે, તો શું તમે તેનો ઉપયોગ કરવાનું વિચારશો — શા માટે અથવા શા માટે નહીં?"
    }
  },
  {
    "id": "q_notes",
    "key": "new_q_notes",
    "type": "textarea",
    "label": {
      "en": "Notes",
      "hi": "Notes (Tippani)",
      "gu": "નોંધો (Notes)"
    }
  }
];

export const staticText = {
  "title": {
    "en": "FARMER COST & MONEY-FLOW QUESTIONNAIRE",
    "hi": "FARMER COST & MONEY-FLOW QUESTIONNAIRE (Kisan ka kharch aur paisa flow)",
    "gu": "ખેડૂત ખર્ચ અને નાણાં-પ્રવાહ પ્રશ્નાવલી"
  },
  "instruction1": {
    "en": "Ask about the real crop just grown. Skip any branch that doesn't apply. Record ₹, quantity and timing. Family labour counts even if unpaid.",
    "hi": "Abhi ugayi gayi asli fasal ke baare me poochein. Jo option kaam ka nahi hai use chhod dein. ₹, quantity aur time likhein. Family ke kaam ko bhi ginein chahe unhe paise na diye ho.",
    "gu": "હમણાં જ ઉગાડવામાં આવેલા વાસ્તવિક પાક વિશે પૂછો. લાગુ ન પડતી કોઈપણ શાખાને છોડી દો. ₹, જથ્થો અને સમય નોંધો. પારિવારિક મજૂરીને પણ ગણો ભલે તે ચૂકવવામાં ન આવી હોય."
  },
  "instruction2": {
    "en": "Condensed field version — 25 to 30 farmer interviews. Target time: 10-12 minutes per farmer.",
    "hi": "Chhota field version — 25 se 30 farmer interviews. Target time: 10-12 minutes per farmer.",
    "gu": "સંક્ષિપ્ત ફિલ્ડ આવૃત્તિ — 25 થી 30 ખેડૂતોના ઇન્ટરવ્યુ. લક્ષ્ય સમય: ખેડૂત દીઠ 10-12 મિનિટ."
  }
};
