import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { ReactHTMLElement, useEffect, useState } from 'react';

export default function LocationSelect(
    { CountryCode, StateCode, setState, setCity, className }: { CountryCode: string, StateCode: string | null, setState: any, setCity: any, className?: string })
    : ReactHTMLElement<HTMLSelectElement> {

    const [Selectedstate, setSelectedState] = useState<string>("");
    function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (!e.target.value) { return; }
        const state = State.getStateByCodeAndCountry(e.target.value, CountryCode);
        setState(state);
        setSelectedState(state?.isoCode || "");
    }
    function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
        City.getCitiesOfState(CountryCode, Selectedstate).map((city: ICity) => {
            if (city.name === e.target.value) {
                setCity(city);
                return;
            }
        });
    }

    return (
        <div className={className}>
            <select
                name="State"
                id=""
                onChange={handleStateChange}
                className='p-2 bg-white w-full rounded-md'
            >
                <option value="">Select State</option>
                {State.getStatesOfCountry(CountryCode).map((state: IState) => (
                    <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                    </option>
                ))}
            </select>
            <select
                name="City"
                id=""
                onChange={handleCityChange}
                disabled={Selectedstate === ""}
                className='p-2 bg-white w-full mt-3 rounded-md'
            >
                <option value="">Select City</option>
                {StateCode && City.getCitiesOfState(CountryCode, StateCode).map((city: ICity) => (
                    <option key={city.name} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div>
    ) as ReactHTMLElement<HTMLSelectElement>;
}