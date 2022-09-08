import useSWR from 'swr'
import { useEffect, useState } from 'react'
import MultiRangeSlider from '../components/multi-range-slider';
import { MinusCircleIcon } from '@heroicons/react/outline';
import {
    eachDayOfInterval,
    subYears,
    addMonths,
    startOfToday,
} from 'date-fns'
import { formatDate, formatCurrency, parseDate } from '../util/format';

const initData = [
    {
        "id": "f3a39913-1dc0-43f1-83ac-617f7793b433",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-08-01",
            "end_date": "2022-08-31"
        },
        "pay_date": "2022-08-15",
        "debit_date": "2022-08-12",
        "gross_pay": {
            "amount": 21751668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 11178451,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 23995671,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 1664003,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 7754467,
            "currency": "usd"
        }
    },
    {
        "id": "69fb9fe2-5625-439c-b8d1-4f98706e4d9f",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-07-01",
            "end_date": "2022-07-31"
        },
        "pay_date": "2022-07-15",
        "debit_date": "2022-07-12",
        "gross_pay": {
            "amount": 25251668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 12905701,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 27943421,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 1931753,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 9002217,
            "currency": "usd"
        }
    },
    {
        "id": "14ebc1f9-b346-490b-b165-841aa896fb2a",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-06-01",
            "end_date": "2022-06-30"
        },
        "pay_date": "2022-06-15",
        "debit_date": "2022-06-10",
        "gross_pay": {
            "amount": 28401668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 14520225,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 31364397,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 2172729,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 10125193,
            "currency": "usd"
        }
    },
    {
        "id": "fc81e596-4dd9-4156-b1a9-ea70d4e81add",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-05-01",
            "end_date": "2022-05-31"
        },
        "pay_date": "2022-05-13",
        "debit_date": "2022-05-10",
        "gross_pay": {
            "amount": 35966668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 18469551,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 39678121,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 2751453,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 12822117,
            "currency": "usd"
        }
    },
    {
        "id": "5f0d1645-16bc-4c4c-83bd-8b0f9beabc0f",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-04-01",
            "end_date": "2022-04-30"
        },
        "pay_date": "2022-04-15",
        "debit_date": "2022-04-12",
        "gross_pay": {
            "amount": 37696668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 19395306,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 41570466,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 2883798,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 13438862,
            "currency": "usd"
        }
    },
    {
        "id": "582b9e50-1164-4bec-b684-918ce2f8a2e3",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-03-01",
            "end_date": "2022-03-31"
        },
        "pay_date": "2022-03-15",
        "debit_date": "2022-03-11",
        "gross_pay": {
            "amount": 40666668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 20969001,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 44957671,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3111003,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 14497667,
            "currency": "usd"
        }
    },
    {
        "id": "f5953490-0faa-4362-a916-79014c099748",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-02-01",
            "end_date": "2022-02-28"
        },
        "pay_date": "2022-02-15",
        "debit_date": "2022-02-11",
        "gross_pay": {
            "amount": 40986668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 21174921,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 45302151,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3135483,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 14611747,
            "currency": "usd"
        }
    },
    {
        "id": "d21cbbce-391b-488c-b3e5-b2d8a709eb5b",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2022-01-01",
            "end_date": "2022-01-31"
        },
        "pay_date": "2022-01-14",
        "debit_date": "2022-01-11",
        "gross_pay": {
            "amount": 42236668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 21791796,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 46637776,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3231108,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 15057372,
            "currency": "usd"
        }
    },
    {
        "id": "8d44abdb-fa6b-4f83-b61d-8876e9d9f67c",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-12-01",
            "end_date": "2021-12-31"
        },
        "pay_date": "2021-12-15",
        "debit_date": "2021-12-10",
        "gross_pay": {
            "amount": 46106668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 23869640,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 50843832,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3527164,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 16437028,
            "currency": "usd"
        }
    },
    {
        "id": "75c5c686-d2b9-457a-a1e8-b4cf4c72b65d",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-11-01",
            "end_date": "2021-11-30"
        },
        "pay_date": "2021-11-15",
        "debit_date": "2021-11-12",
        "gross_pay": {
            "amount": 47481668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 24548202,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 52394020,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3632352,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 16927216,
            "currency": "usd"
        }
    },
    {
        "id": "a88e8f8f-a78c-438a-9682-d87805f8d17a",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-10-01",
            "end_date": "2021-10-31"
        },
        "pay_date": "2021-10-15",
        "debit_date": "2021-10-12",
        "gross_pay": {
            "amount": 49211668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 25473957,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 54316365,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 3764697,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 17543961,
            "currency": "usd"
        }
    },
    {
        "id": "39bf020e-528a-407f-99ac-ab4dcb5d6ba5",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-09-01",
            "end_date": "2021-09-30"
        },
        "pay_date": "2021-09-15",
        "debit_date": "2021-09-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57854990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "298b187e-3232-4b32-b5f1-3cbdd7a9cbee",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-08-01",
            "end_date": "2021-08-31"
        },
        "pay_date": "2021-08-13",
        "debit_date": "2021-08-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57954990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "cf2c4b0a-0e16-42fc-a9da-5b934b3f43c5",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-07-01",
            "end_date": "2021-07-31"
        },
        "pay_date": "2021-07-15",
        "debit_date": "2021-07-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57944990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "59e6beb3-d546-46fc-b0e7-592680353755",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-06-01",
            "end_date": "2021-06-30"
        },
        "pay_date": "2021-06-15",
        "debit_date": "2021-06-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57994990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "bfc65982-5322-4ed7-8206-c26dfc712213",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-05-01",
            "end_date": "2021-05-31"
        },
        "pay_date": "2021-05-14",
        "debit_date": "2021-05-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57954990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "af242fa2-a727-48f0-a462-64ae4ba6e395",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-04-01",
            "end_date": "2021-04-30"
        },
        "pay_date": "2021-04-15",
        "debit_date": "2021-04-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57904990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "03b700cc-3a9e-443c-a26a-86c0cadec2d8",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-03-01",
            "end_date": "2021-03-31"
        },
        "pay_date": "2021-03-15",
        "debit_date": "2021-03-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57934990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "af169d6c-0c7d-415e-ba56-e93cf256beb1",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-02-01",
            "end_date": "2021-02-28"
        },
        "pay_date": "2021-02-15",
        "debit_date": "2021-02-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57934990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "42d40409-be44-4e3b-9d0d-aae03ccc7fc4",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2021-01-01",
            "end_date": "2021-01-31"
        },
        "pay_date": "2021-01-15",
        "debit_date": "2021-01-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57904990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "84ae9a49-dedb-4652-acd7-382cfbdac3d0",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-12-01",
            "end_date": "2020-12-31"
        },
        "pay_date": "2020-12-15",
        "debit_date": "2020-12-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57854990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "9a2ef67b-1192-46c7-8dae-4922a51fc836",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-11-01",
            "end_date": "2020-11-30"
        },
        "pay_date": "2020-11-13",
        "debit_date": "2020-11-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57864990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "e776bfcf-5934-400d-9b52-0500d0e1e0e0",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-10-01",
            "end_date": "2020-10-31"
        },
        "pay_date": "2020-10-15",
        "debit_date": "2020-10-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57884990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "ee71f0ae-ce09-40c8-acf2-7abc62503173",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-09-01",
            "end_date": "2020-09-30"
        },
        "pay_date": "2020-09-15",
        "debit_date": "2020-09-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57954990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "6efd0230-c620-4a4f-8ef3-0ddda235405d",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-08-01",
            "end_date": "2020-08-31"
        },
        "pay_date": "2020-08-14",
        "debit_date": "2020-08-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57964990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "b87f6d5c-0da1-4a29-93c9-2fdc342a0458",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-07-01",
            "end_date": "2020-07-31"
        },
        "pay_date": "2020-07-15",
        "debit_date": "2020-07-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57894990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "c0d0c56d-4ea8-4039-a783-5e306a288d82",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-06-01",
            "end_date": "2020-06-30"
        },
        "pay_date": "2020-06-15",
        "debit_date": "2020-06-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57944990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "73e2a542-87ef-4e09-8c9f-7e0f9e3387df",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-05-01",
            "end_date": "2020-05-31"
        },
        "pay_date": "2020-05-15",
        "debit_date": "2020-05-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57774990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "f860b3b5-65c4-4000-b711-faa0b14db983",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-04-01",
            "end_date": "2020-04-30"
        },
        "pay_date": "2020-04-15",
        "debit_date": "2020-04-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57814990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "ce7b5d8a-36a4-4802-8d2f-36f36d2b7a28",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-03-01",
            "end_date": "2020-03-31"
        },
        "pay_date": "2020-03-13",
        "debit_date": "2020-03-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57884990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "d7bb9a85-b0d0-4837-8463-213d1da33279",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-02-01",
            "end_date": "2020-02-29"
        },
        "pay_date": "2020-02-14",
        "debit_date": "2020-02-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57954990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "f43dc548-187a-4fce-988c-98c76c845ede",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2020-01-01",
            "end_date": "2020-01-31"
        },
        "pay_date": "2020-01-15",
        "debit_date": "2020-01-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57824990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "a3641d95-d531-4cf6-b084-d8cd522246ed",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2019-12-01",
            "end_date": "2019-12-31"
        },
        "pay_date": "2019-12-13",
        "debit_date": "2019-12-10",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57894990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "8613eaa5-626f-4ff4-9ace-8440660a89bf",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2019-11-01",
            "end_date": "2019-11-30"
        },
        "pay_date": "2019-11-15",
        "debit_date": "2019-11-12",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57894990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    },
    {
        "id": "43ce92ed-f01f-4a2a-b764-9de01355ebc2",
        "individual_ids": [
            "3f112ab2-8f0c-4096-9d66-ac5a8c4e7f6a",
            "8c07a198-b2ca-4c46-a6fe-24e389f8105c",
            "db6c104c-21e1-474f-b0c7-442c0df0596f",
            "36713445-b2cd-4a5a-808f-5488c35520e1",
            "bbbbfee9-e470-408a-bf3d-666a91748adc",
            "64d26ec2-9f83-48e6-a96a-c9b70441e779",
            "3a90ceb7-8547-49f8-8cc8-e37a9e1a477e",
            "60c2efe5-0da3-45c2-bdac-d23517d883e4",
            "17fea103-8f88-4ebc-9bcc-219a3dcbce0e",
            "d2a926a7-6ace-417c-91ba-8fc39521aeac",
            "0417eeaf-41f9-4266-a4c4-ac430d61d280",
            "6d01d7bc-6962-4a58-b630-d3ca93e08bf2",
            "534dd60a-3491-4773-a47a-e5ed915337a9",
            "f8f7576f-0d6a-4a63-94cc-92a34c407e91",
            "fa79d96b-d122-4d07-895c-e1def18a9076",
            "e7837af1-dea2-49ab-8b5b-d63ac7323ea7",
            "e870672b-64e5-47fb-b739-f08e88d24ad5",
            "394f5cc5-aa71-4aa3-b63c-29b0481eec55",
            "bd8e131d-682a-43af-afb1-d59242a9f16c",
            "32974591-15df-429c-9730-7255b75a2bb3",
            "74635511-f7d2-4c44-a9c1-fb574a0673a1",
            "b3cffffe-85d6-44e8-996e-7810806b1a9c",
            "70bd1849-aa26-41ee-bd7c-aa36e1822514",
            "a428c637-ac07-4345-815d-0089cb602874",
            "8c476005-0836-4d8c-be5d-00e8bb2e772e",
            "64a6bc20-db9b-46cc-b448-dddd918561a6",
            "654ca16a-fc41-4def-be67-5f27c8581da5",
            "05123dde-f260-4391-8640-9b6b00edfee7",
            "055a2166-7452-4ae6-8905-adc1ce46ca5a",
            "aefb537d-48e5-4182-9fca-e2f5c326d72f",
            "53d35a10-d146-4b84-aa53-8beab7338d6a",
            "25344b5d-b52f-409b-bcec-d82373261614",
            "4774fdee-c78e-4ef2-ab81-b1650c14db21",
            "45314a9e-1b46-432d-aa00-4d8a040fa69d",
            "96dfa126-52e7-43a5-ac7d-930123ffda8b",
            "c62a74e3-d90f-47fe-9ec5-a7d51efa57a2",
            "7af9529a-5473-4bbf-8474-a9b83a0c97d4",
            "1ef67d3b-20e6-45d4-b8c3-1cd99439db49",
            "6ad70c70-7895-4a63-a688-61ce19b9705e",
            "080ba758-d340-48ac-9c14-29962b31be52",
            "1e217c28-1199-424d-8716-7c5ef6e0c908",
            "5d416b12-eb01-45ba-9ff8-b55e763c565d",
            "9ea5100b-b515-470f-9cd4-8d5e9d86b4f2",
            "2c7e0eb1-bfac-417d-a10b-c861b59266d1",
            "beee2e34-1e4f-4603-b796-bf6caac806f9",
            "c7fef978-67aa-45d0-bf8b-b22cfd6a0a29",
            "ba73c3d5-18c9-472f-b838-93ff9901aa80",
            "006e0817-971e-48e3-b3c1-a4b5914eea05",
            "1a95b97a-3985-4719-97e8-ea969cf38c73",
            "c5e54988-7cd6-4ef3-bcdb-38bd43bf7f21",
            "590af7b9-c046-457e-a1c8-cd1238543d6f",
            "392cb5a3-afd4-4097-839e-4d2ada0a9574",
            "3a683ccb-d4e5-40c5-8b42-86357217bfb5",
            "9ba70ce4-6234-4fd4-9e10-a300ea03159b"
        ],
        "pay_period": {
            "start_date": "2019-10-01",
            "end_date": "2019-10-31"
        },
        "pay_date": "2019-10-15",
        "debit_date": "2019-10-11",
        "gross_pay": {
            "amount": 52461668,
            "currency": "usd"
        },
        "net_pay": {
            "amount": 27077832,
            "currency": "usd"
        },
        "company_debit": {
            "amount": 57904990,
            "currency": "usd"
        },
        "employer_taxes": {
            "amount": 4013322,
            "currency": "usd"
        },
        "employee_taxes": {
            "amount": 18702586,
            "currency": "usd"
        }
    }
]

// Setting a static date range to receive the last 3 years of payroll. A month needs to be added since the month is zero-indexed
const dateRange = eachDayOfInterval({
    start: addMonths(subYears(startOfToday(), 3), 1),
    end: startOfToday()
})
const startDateInit = 1
const startDate = formatDate(dateRange[startDateInit - 1])
const endDateInit = dateRange.length + 1
const endDate = formatDate(dateRange[endDateInit - 2])

export default function Payroll() {
    const [startDateNum, setStartDateNum] = useState<number>(startDateInit)
    const [endDateNum, setEndDateNum] = useState<number>(endDateInit)
    const { data, error, isValidating } = useSWR(`/api/finch/payment?start_date=${startDate}&end_date=${endDate}`, { revalidateOnFocus: false })
    const [payroll, setPayroll] = useState<FinchPayment[]>()

    useEffect(() => {
        console.log(data?.data)
        setPayroll(data?.data)
    }, [data])

    if (error) return <div>{error.message}</div>
    if (!data?.data || !payroll) return ""

    // useEffect(() => {
    //     console.log(`start: ${startDateNum}; end: ${endDateNum}`)
    //     debounce(() => {
    //         const { data, error, isValidating } = useSWR(`/api/finch/payment?start_date=${formatDate(dateRange[startDateNum - 1])}&end_date=${formatDate(dateRange[endDateNum - 2])}`, { revalidateOnFocus: false })
    //         setPayroll(data?.data)
    //     }, 1000)
    //     //setPayroll(data?.data)
    // }, [startDateNum, endDateNum])

    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
                        Finch
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        Payroll
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Read payroll and contractor related payments by the company.
                        <br></br>
                        Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/b811fdc2542ca-payment" target="_blank">/payment</a> API Endpoint.
                    </p>

                    <p className="mt-4 mb-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Filter the last three years of payroll payments by 'start_date' and 'end_date'.
                    </p>
                </div>

                <MultiRangeSlider
                    min={1}
                    max={dateRange.length + 1}
                    dateRange={dateRange}
                    onChange={({ min, max }: { min: number, max: number }) => { console.log(`min = ${min}, max = ${max}`); setStartDateNum(min); setEndDateNum(max) }}
                />

                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Payment Id</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pay Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Debit Date</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gross Pay</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Net Pay</th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">View</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {payroll.filter(payment => {
                                                return payment?.pay_period?.start_date > formatDate(dateRange[startDateNum - 1]) && payment?.pay_period?.end_date < formatDate(dateRange[endDateNum - 2])
                                            }).map((payment, index) => (
                                                <tr className="border-t border-gray-300" key={index}>
                                                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-semibold text-gray-900 sm:pl-6">{payment.id}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_period.start_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_period.end_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.pay_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{parseDate(payment.debit_date)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{formatCurrency(payment.gross_pay.amount) + ' ' + payment.gross_pay.currency.toUpperCase()}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{formatCurrency(payment.net_pay.amount) + ' ' + payment.net_pay.currency.toUpperCase()}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href={`/payment/${payment.id}?start_date=${payment.pay_period.start_date}&end_date=${payment.pay_period.end_date}`} className="text-indigo-600 hover:text-indigo-900">View<span className="sr-only">{payment.id}</span></a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}