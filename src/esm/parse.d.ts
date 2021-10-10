export type PropertyNames =
  | 'SOURCE'
  | 'KIND'
  | 'FN'
  | 'N'
  | 'NICKNAME'
  | 'PHOTO'
  | 'BDAY'
  | 'ANNIVERSARY'
  | 'GENDER'
  | 'ADR'
  | 'TEL'
  | 'EMAIL'
  | 'IMPP'
  | 'LANG'
  | 'TZ'
  | 'GEO'
  | 'TITLE'
  | 'ROLE'
  | 'LOGO'
  | 'ORG'
  | 'MEMBER'
  | 'RELATED'
  | 'CATEGORIES'
  | 'NOTE'
  | 'PRODID'
  | 'REV'
  | 'SOUND'
  | 'UID'
  | 'CLIENTPIDMAP'
  | 'URL'
  | 'KEY'
  | 'FBURL'
  | 'CALADRURI'
  | 'CALURI'
  | 'XML'
  | string;
export type PropertiesAndValue<T> = { parameters?: Parameters; value: T };
export type ParameterNames =
  | 'LANGUAGE'
  | 'VALUE'
  | 'PREF'
  | 'ALTID'
  | 'PID'
  | 'TYPE'
  | 'MEDIATYPE'
  | 'CALSCALE'
  | 'SORT-AS'
  | 'GEO'
  | 'TZ'
  | string;
type ArrayTwoOrMore<T> = [T, T, ...T[]];
type SingleOrArray<T> = T | ArrayTwoOrMore<T>;
export type Parameters = Record<ParameterNames, string>;
export type ADRValue = {
  postOfficeBox: string;
  extendedAddress: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  countryName: string;
};
export type NValue = {
  familyNames: string | string[];
  givenNames: SingleOrArray<string>;
  additionalNames: SingleOrArray<string>;
  honorificPrefixes: SingleOrArray<string>;
  honorificSuffixes: SingleOrArray<string>;
};
export type GENDERValue = { sex: string; gender: string };
export type ORGValue = SingleOrArray<string>;
export type ParsedVCard = {
  BEGIN: { value: string };
  END: { value: string };
  VERSION: { value: string };
  FN: PropertiesAndValue<string>;
  N?: PropertiesAndValue<NValue>;
  GENDER?: PropertiesAndValue<GENDERValue>;
  ORG?: PropertiesAndValue<SingleOrArray<string>>;
  ADR?: PropertiesAndValue<SingleOrArray<string>>[];
} & Record<
  Omit<
    PropertyNames,
    'BEGIN' | 'END' | 'VERSION' | 'FN' | 'N' | 'GENDER' | 'ORG' | 'ADR'
  >,
  PropertiesAndValue<string> | PropertiesAndValue<string>[]
>;

export default function parse(vcard: string): ParsedVCard;
