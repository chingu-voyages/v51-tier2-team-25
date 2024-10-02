import PropTypes from 'prop-types';

export default function MobileSearchBar({name, onChange}) {
    return (
        <div className="flex border-2 mb-3 p-2 rounded-md border-gray-300">
            <img src="../../images/Search.svg" className="mr-2 " alt="Search icon"/>
            <input 
                type="text"
                key="search-bar"
                placeholder={`Search for a ${name}`}
                className="w-full p-2 bg-blue-background"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

MobileSearchBar.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}