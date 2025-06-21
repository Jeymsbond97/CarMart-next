import { PropertyBrand, PropertyColor, PropertyFuel, PropertyStatus, PropertyTransmission, } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyTransmission: PropertyTransmission;
	propertyBrand: PropertyBrand;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyColor: PropertyColor;
	propertyFuel: PropertyFuel;
	propertyOdometer: number;
	propertyYear: number
	propertyImages: string[];
	propertyDesc?: string;
	propertySell?: boolean;
	propertyRent?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	transmissionList?: PropertyTransmission[];
	colorList?: PropertyColor[];
	fuelList?: PropertyFuel[];
	brandList?: PropertyBrand[]
	options?: string[];
	odometerRange?: Range;
	pricesRange?: Range;
	yearsRange?: Range;
	periodsRange?: PeriodsRange;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyBrand?: PropertyBrand[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
