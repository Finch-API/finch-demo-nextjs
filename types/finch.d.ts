type FinchProvider = {
    token: string,
    data: FinchToken
}

type FinchToken = {
    client_id: string,
    company_id: string,
    products: string[],
    username: string,
    payroll_provider_id: string,
    manual: boolean
}

type FinchEmployee = {
    id: string,
    first_name: string,
    middle_name: string,
    last_name: string
    manager: {
        id: string
    },
    department: {
        name: string
    },
    is_active: boolean
}

type FinchDirectory = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
}

type FinchIndividual = {
    id: string,
    first_name: string | null,
    middle_name: string,
    last_name: string,
    preferred_name: string,
    emails: {
        data: string,
        type: 'work' | 'personal',
    }[],
    phone_numbers: {
        data: string,
        type: 'work' | 'personal' | null,
    }[],
    gender: 'female' | 'male' | 'other' | 'decline_to_specify' | null,
    dob: string,
    residence: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string
    }
}

type FinchIndividualEmployment = {
    id: string,
    first_name: string | null,
    middle_name: string,
    last_name: string,
    title: string,
    manager: {
        id: string
    },
    department: {
        name: string
    },
    employment: {
        type: 'employee' | 'contractor' | null,
        subtype: 'full_time' | 'intern' | 'part_time' | 'temp' | 'seasonal' | 'individual_contractor' | null
    }
    start_date: string,
    end_date: string,
    is_active: boolean,
    class_code: string,
    location: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country: string
    },
    income: {
        unit: 'yearly' | 'quarterly' | 'monthly' | 'semi_monthly' | ' bi_weekly' | 'weekly' | 'daily' | 'hourly' | 'fixed'
        amount: number,
        currency: string,
        effective_date: string
    },
    income_history: {
        unit: 'yearly' | 'quarterly' | 'monthly' | 'semi_monthly' | ' bi_weekly' | 'weekly' | 'daily' | 'hourly' | 'fixed'
        amount: number,
        currency: string,
        effective_date: string
    }[]
}