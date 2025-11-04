export interface IFormProps {
  contact_name: string;
  organisation_name: string;
  position_title?: string;
  email: string;
  phone: string;
  sponsorship_type: string[];
  amount?: string;
  notes: string;
  preferred_communication_method: string;
  sponsorship_goals_and_expectations: string;
  in_kind_support_type?: string;
}
