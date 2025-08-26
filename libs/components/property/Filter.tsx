import React, { useCallback, useEffect, useState } from 'react';
import { CSSProperties } from "react";
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	SelectChangeEvent,
	ListItemText,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { PropertyBrand, PropertyColor, PropertyFuel, PropertyTransmission } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 210, // Scroll chiqadigan maksimal balandlik
			overflowY: 'auto' as CSSProperties["overflowY"],
		},
	},
	MenuListProps: {
		sx: {
			'&::-webkit-scrollbar': {
				width: '6px',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#ccc',
				borderRadius: '3px',
			},
		},
	},
};


interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const thisYear = new Date().getFullYear();
	const [propertyBrand, setPropertyBrand] = useState<PropertyBrand[]>(Object.values(PropertyBrand));
	const [propertyTransmission, setPropertyTransmission] = useState<PropertyTransmission[]>(Object.values(PropertyTransmission));
	const [propertyColor, setPropertyColor] = useState<PropertyColor[]>(Object.values(PropertyColor));
	const [propertyFuel, setPropertyFuel] = useState<PropertyFuel[]>(Object.values(PropertyFuel));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const [yearRange, setYearRange] = useState({
		start: 2000,
		end: thisYear,
	});

	/** LIFECYCLES **/
	useEffect(() => {
		const queryParams = JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		});

		if (searchFilter?.search?.brandList?.length == 0) {
			delete searchFilter.search.brandList;
			setShowMore(false);
			router.push(`/property?input=${queryParams}`, `/property?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.transmissionList?.length == 0) {
			delete searchFilter.search.transmissionList;
			router.push(`/property?input=${queryParams}`, `/property?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.colorList?.length == 0) {
			delete searchFilter.search.colorList;
			router.push(`/property?input=${queryParams}`, `/property?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(`/property?input=${queryParams}`, `/property?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.fuelList?.length == 0) {
			delete searchFilter.search.fuelList;
			router.push(`/property?input=${queryParams}`, `/property?input=${queryParams}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.brandList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const propertyLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.brandList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.transmissionList?.length == 0) {
					alert('error');
				}

				console.log('propertyBrandSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyBrandSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, transmissionList: [...(searchFilter?.search?.transmissionList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, transmissionList: [...(searchFilter?.search?.transmissionList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.transmissionList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.transmissionList?.length == 0) {
					alert('error');
				}

				console.log('propertyTransmissionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTransmissionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyFuelSelectHandler = useCallback(
		async (event: SelectChangeEvent<any>) => {
		const {
			target: { value },
		} = event;
		const newValue = typeof value === 'string' ? value.split(',') : value;

		await router.push(
			`/property?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
				fuelList: newValue,
			},
			})}`,
			undefined,
			{ scroll: false },
		);
		},
		[searchFilter],
	);

	const propertyColorSelectHandler = useCallback(
		async (event: SelectChangeEvent<string[]>) => {
			try {
				const {
					target: { value },
				} = event;
	
				const selectedColors = typeof value === 'string' ? value.split(',') : value;
	
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							colorList: selectedColors,
						},
					})}`,
					undefined,
					{ scroll: false }
				);
			} catch (err) {
				console.log('ERROR, propertyColorSelectHandler:', err);
			}
		},
		[router, searchFilter]
	);
	
	const propertyPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const propertyYearHandler = useCallback(
		async (value: number, type: string) => {
			if (type === 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter.search.yearsRange, start: value },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter.search.yearsRange, start: value },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter.search.yearsRange, end: value },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearsRange: { ...searchFilter.search.yearsRange, end: value },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const propertyOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/property?input=${JSON.stringify(initialInput)}`,
				`/property?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>LISTING FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Car</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'Find car by name'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Brands
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.brandList) {
								setShowMore(false);
							}
						}}
					>
						{propertyBrand.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="property-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.brandList || []).includes(location as PropertyBrand)}
										onChange={propertyLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home transmission-group'} mb={'30px'}>
					<Typography className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>Transmission</Typography>
					<Stack className="checkbox-grid">
						{propertyTransmission.map((type: string) => (
							<Stack className="input-box" key={type}>
								<Checkbox
									id={type}
									className="property-checkbox"
									color="default"
									size="small"
									value={type}
									onChange={propertyTypeSelectHandler}
									checked={(searchFilter?.search?.transmissionList || []).includes(type as PropertyTransmission)}
								/>
								<label style={{ cursor: 'pointer', fontFamily: '$font' }}>
									<Typography className="property_type">{type}</Typography>
								</label>
							</Stack>
						))}
					</Stack>
				</Stack>

				<Stack className={'find-your-home'}>
					<FormControl fullWidth>
						<InputLabel id="fuel-label" sx={{
							color: '#181a20 !important',
							fontSize: '15px',
							fontWeight:'500',
							fontFamily: '$font',
							'&.Mui-focused': {
							color: '#181a20 !important',
							},
							'&.MuiFormLabel-filled': {
							color: '#181a20 !important',
							}
						}}>Select Fuel Type</InputLabel>
						<Select
							labelId="fuel-label"
							id="fuel"
							multiple
							className="fuel-select"
							value={searchFilter.search.fuelList || []}
							onChange={propertyFuelSelectHandler}
							input={<OutlinedInput label="Select Fuel Type" />}
							renderValue={(selected: string[]) => selected.join(', ')}
							MenuProps={{
								...MenuProps,
								PaperProps: {
									sx: {
										'& .MuiMenuItem-root': {
										fontSize: '14px !important',
										fontFamily: '$font !important',
										padding: '4px 1px !important',
										'&:hover': {
											backgroundColor: '#f5f5f5 !important',
										},
										'&.Mui-selected': {
											backgroundColor: '#f5f5f5; !important',
											color: '#181a20 !important',
											'&:hover': {
												backgroundColor: '#f5f5f5 !important',
												color: '#181a20 !important',
											},
											'& .MuiCheckbox-root': {
											color: '#181a20 !important',
											},
											'& .MuiListItemText-primary': {
											color: '##181a20 !important',
											}
										}
										}
									}
									}
								}}
							sx={{
								borderColor: '#ddd',
								'& fieldset': {
									borderColor: '#ddd !important', // oddiy holat
								},
								'&:hover fieldset': {
									borderColor: '#aaa !important', // hover holat
								},
								'&.Mui-focused fieldset': {
									borderColor: '#ddd !important', // tanlanganda (focused)
								},
							}}
						>
							{propertyFuel.map((fuel) => (
							<MenuItem key={fuel} value={fuel}>
									<Checkbox checked={(searchFilter.search.fuelList || []).includes(fuel)}
										sx={{
										padding: '0 8px 0 0',
										color: 'inherit',
										}}/>
									<ListItemText primary={fuel}
										sx={{
											'& .MuiListItemText-primary': {
											fontSize: '14px',
											fontFamily: '$font',
											}
										}}/>
							</MenuItem>
							))}
						</Select>
						</FormControl>
				</Stack>
                <Stack className={'find-your-home'}>
					<FormControl fullWidth>
						<InputLabel id="color-label" sx={{
							color: '#181a20 !important',
							fontSize: '15px',
							fontWeight:'500',
							fontFamily: '$font',
							'&.Mui-focused': {
								color: '#181a20 !important',
							},
							'&.MuiFormLabel-filled': {
								color: '#181a20 !important',
							}
						}}>
							Select Color
						</InputLabel>
						<Select
							labelId="color-label"
							id="color"
							multiple
							className="color-select"
							value={searchFilter.search.colorList || []}
							onChange={propertyColorSelectHandler}
							input={<OutlinedInput label="Select Color" />}
							renderValue={(selected: string[]) => selected.join(', ')}
							MenuProps={{
								...MenuProps,
								PaperProps: {
									sx: {
										'& .MuiMenuItem-root': {
											fontSize: '14px !important',
											fontFamily: '$font !important',
											padding: '4px 1px !important',
											'&:hover': {
												backgroundColor: '#f5f5f5 !important',
											},
											'&.Mui-selected': {
												backgroundColor: '#f5f5f5 !important',
												color: '#181a20 !important',
												'&:hover': {
													backgroundColor: '#f5f5f5 !important',
													color: '#181a20 !important',
												},
												'& .MuiCheckbox-root': {
													color: '#181a20 !important',
												},
												'& .MuiListItemText-primary': {
													color: '#181a20 !important',
												}
											}
										}
									}
								}
							}}
							sx={{
								borderColor: '#ddd',
								'& fieldset': {
									borderColor: '#ddd !important',
								},
								'&:hover fieldset': {
									borderColor: '#aaa !important',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#ddd !important',
								},
							}}
						>
							{propertyColor.map((color) => (
								<MenuItem key={color} value={color}>
									<Checkbox checked={(searchFilter.search.colorList || []).includes(color)}
										sx={{
											padding: '0 8px 0 0',
											color: 'inherit',
										}} />
									<ListItemText primary={color}
										sx={{
											'& .MuiListItemText-primary': {
												fontSize: '14px',
												fontFamily: '$font',
											}
										}} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>


				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Barter'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'propertySell'}
							checked={(searchFilter?.search?.options || []).includes('propertySell')}
							onChange={propertyOptionSelectHandler}
						/>
						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Sell</Typography>
						</label>
					</Stack>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'propertyRent'}
							checked={(searchFilter?.search?.options || []).includes('propertyRent')}
							onChange={propertyOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Rent</Typography>
						</label>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>Year Range</Typography>
					<Stack className="square-year-input" style={{marginBottom:'20px'}}>
						<FormControl fullWidth>
							<InputLabel id="year-start-label">Min</InputLabel>
							<Select
								labelId="year-start-label"
								id="year-start"
								value={searchFilter?.search?.yearsRange?.start ?? 2000}
								label="Min"
								onChange={(e: any) => propertyYearHandler(e.target.value, 'start')}
								MenuProps={MenuProps}
								sx={{
									borderColor: '#ddd',
									'& fieldset': {
										borderColor: '#ddd !important', // oddiy holat
									},
									'&:hover fieldset': {
										borderColor: '#aaa !important', // hover holat
									},
									'&.Mui-focused fieldset': {
										borderColor: '#ddd !important', // tanlanganda (focused)
									},
								}}
							>
								{Array.from({ length: thisYear - 2000 + 1 }, (_, i) => 2000 + i).map((year) => (
									<MenuItem
										value={year}
										disabled={(searchFilter?.search?.yearsRange?.end || thisYear) < year}
										key={year}
									>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl fullWidth>
							<InputLabel id="year-end-label">Max</InputLabel>
							<Select
								labelId="year-end-label"
								id="year-end"
								value={searchFilter?.search?.yearsRange?.end ?? thisYear}
								label="Max"
								onChange={(e: any) => propertyYearHandler(e.target.value, 'end')}
								MenuProps={MenuProps}
								sx={{
									borderColor: '#ddd',
									'& fieldset': {
										borderColor: '#ddd !important', // oddiy holat
									},
									'&:hover fieldset': {
										borderColor: '#aaa !important', // hover holat
									},
									'&.Mui-focused fieldset': {
										borderColor: '#ddd !important', // tanlanganda (focused)
									},
								}}
							>
								{Array.from({ length: thisYear - 2000 + 1 }, (_, i) => 2000 + i).map((year) => (
									<MenuItem
										value={year}
										disabled={(searchFilter?.search?.yearsRange?.start || 2000) > year}
										key={year}
									>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'}>
					<Typography className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
