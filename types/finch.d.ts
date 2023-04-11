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

type FinchCompany = {
    id: string;
    legal_name: string | null;
    entity: {
        type: string;
        subtype: string | null;
    };
    ein: string | null;
    primary_email: string | null;
    primary_phone_number: string | null;
    departments: FinchDepartment[];
    locations: FinchLocation[];
    accounts: FinchAccount[];
}

type NotImplementedError = {
    statusCode: number,
    status: number,
    code: number,
    message: string,
    name: string
}

type FinchDepartment = {
    name: string | null;
    parent: {
        name: string | null;
    }
}
type FinchLocation = {
    line1: string | null;
    line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
}

type FinchAccount = {
    institution_name: string | null;
    account_name: string | null;
    account_type: string | null;
    account_number: string | null;
    routing_number: string | null;
}

type FinchDirectory = {
    paging: {
        count: number
        offset: number
    },
    individuals: FinchEmployee[]
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
    ethnicity: 'asian' | 'white' | 'black_or_african_american' | 'native_hawaiian_or_pacific_islander' | 'american_indian_or_alaska_native' | 'hispanic_or_latino' | 'two_or_more_races' | 'decline_to_specify' | null,
    dob: string,
    ssn: string,
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
        unit: 'yearly' | 'quarterly' | 'monthly'
        | 'semi_monthly' | ' bi_weekly' | 'weekly'
        | 'daily' | 'hourly' | 'fixed'
        amount: number,
        currency: string,
        effective_date: string
    },
    income_history: {
        unit: 'yearly' | 'quarterly' | 'monthly'
        | 'semi_monthly' | ' bi_weekly' | 'weekly'
        | 'daily' | 'hourly' | 'fixed'
        amount: number,
        currency: string,
        effective_date: string
    }[],
    custom_fields: {
        name: string | null,
        value: string | number | null
    }[]
}

type Money = {
    amount: number,
    currency: string
}

type FinchPayment = {
    id: string;
    pay_period: {
        start_date: string,
        end_date: string
    };
    pay_date: string,
    debit_date: string;
    company_debit: Money
    gross_pay: Money
    net_pay: Money
    employer_taxes: Money
    employee_taxes: Money
    individual_ids: string[];
}

type FinchPayStatement = {
    individual_id: string,
    type: 'regular_payroll' | 'off_cycle_payroll' | 'one_time_payment' | null,
    payment_method: 'check' | 'direct_deposit' | null,
    total_hours: number,
    gross_pay: Money,
    net_pay: Money,
    earnings: {
        type: 'salary' | 'wage' | 'reimbursement'
        | 'overtime' | 'severance' | 'double_overtime'
        | 'pto' | 'sick' | 'bonus' | 'commission'
        | 'tips' | '1099' | 'other' | null,
        name: string,
        amount: number,
        currency: string,
        hours: number
    }[],
    taxes: {
        type: string,
        name: string,
        employer: boolean,
        amount: number,
        currency: string
    }[],
    employee_deductions: {
        name: string,
        amount: number,
        currency: string,
        pre_tax: boolean,
        type: '401k' | '401k_roth' | '401k_loan'
        | '403b' | '403b_roth' | '457' | '457_roth'
        | 's125_medical' | 's125_dental' | 's125_vision'
        | 'hsa_pre' | 'hsa_post' | 'fsa_medical'
        | 'fsa_dependent_care' | 'simple_ira' | 'simple'
        | 'commuter' | 'custom_post_tax' | 'custom_pre_tax'
    }[],
    employer_contributions: {
        name: string,
        amount: number,
        currency: string,
        type: '401k' | '401k_roth' | '401k_loan'
        | '403b' | '403b_roth' | '457' | '457_roth'
        | 's125_medical' | 's125_dental' | 's125_vision'
        | 'hsa_pre' | 'hsa_post' | 'fsa_medical'
        | 'fsa_dependent_care' | 'simple_ira' | 'simple'
        | 'commuter' | 'custom_post_tax' | 'custom_pre_tax'
    }[]
}