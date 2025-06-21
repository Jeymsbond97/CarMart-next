import {  PropertyBrand, PropertyColor, PropertyFuel, PropertyStatus, PropertyTransmission, } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyTransmission?: PropertyTransmission;
	propertyStatus?: PropertyStatus;
	propertyBrand?: PropertyBrand;
	propertyColor?: PropertyColor;
	propertyFuel?: PropertyFuel;
	propertyOdometer?: number;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyYear?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	propertySell?: boolean;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
