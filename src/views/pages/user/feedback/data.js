export const questions = [
    {
      key: "que_1",
      type: "mcs",
      question: "1. Are you student at PTE Magic?",
      choises: [
        { text: "Yes", key: 'yes' },
        { text: "No", key: 'no' },
      ]
    },
    {
      key: "que_2",
      type: "mcs",
      question: "2. What is your current job?",
      choises: [
        { text: "Student", key: 'student' },
        { text: "Teacher", key: 'teacher' },
        { text: "Other", key: 'other' },
      ]
    },
    {
      key: "que_3",
      type: "select",
      question: "3. Which country are you from?",
      choises: [
        { text: "Please Select", key: 0 },
        { text: "India", key: 'india' },
        { text: "Korea", key: 'korea' },
        { text: "Vietnam", key: 'vietnam' },
        { text: "China", key: 'china' },
        { text: "Pakistan", key: 'pakistan' },
        { text: "Singapore", key: 'singapore' },
        { text: "Others", key: 'others' },
      ]
    },
    {
      key: "que_4",
      type: "mcs",
      question: "4. Do your skills improve after using PTE Magic?",
      choises: [
        { text: "Strongly Disagree", key: 'strongly_disagree' },
        { text: "Disagree", key: 'disagree' },
        { text: "Undecided", key: 'undecided' },
        { text: "Agree", key: 'agree' },
        { text:"Strongly agree", key:'strongly_agree'}
      ]
    },
    {
      key: "que_5",
      type: "mcs",
      question: "5. The website is easy to use and user-friendly.",
      choises: [
        { text: "Strongly Disagree", key: 'strongly_disagree' },
        { text: "Disagree", key: 'disagree' },
        { text: "Undecided", key: 'undecided' },
        { text: "Agree", key: 'agree' },
        { text:"Strongly agree", key:'strongly_agree'}
      ]
    },
    {
      key: "que_6",
      type: "mcm",
      question: "6. Which feature do you like most?",
      choises: [
        { text: "Mock test", key: 'mock_test' },
        { text: "Question bank", key: 'question_bank' },
        { text: "AI and speech recognition technology", key: 'al_and_speech' },
        { text:'Video Course', key: 'video_course'},
        { text: "Other", key: 'other' },
      ]
    }, 
    {
      key: "que_7",
      type: "mcs",
      question: "7. Will you introduce PTE Magic to your friends/colleagues?",
      choises: [ 
        { text: "Yes", key: 'yes' },
        { text: "No", key: 'no' },
      ]
    },
    {
      key: "que_8",
      type: "text",
      question: "8. Do you have any suggestions to make our websites better?"
    },
  ]

  export const souvenir = {
    key: "souvenir",
    type: "select",
    question: "Please select Your Rewards",
    choises: [
      { text: "*PTE Hot Tips* Ebook 2021 ", key: 1 },
      { text: "40% Discount on Magic Shop", key: 2 },
      { text: "3-day Unlimited AI Scoring", key: 3 },
      { text: "Secret Gift", key: 4 }
    ]
  }