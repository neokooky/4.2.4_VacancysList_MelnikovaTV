import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Group, NativeSelect, Pill, Stack, TextInput, } from "@mantine/core";
import styles from "./Filters.module.css";
import icon from "../../images/add_icon.svg";
import { IconMapPin } from "@tabler/icons-react";
import { memo, useState } from "react";
import { setSelectedCity, setSkills, setPage, } from "../../store/vacanciesSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
var RegionValue;
(function (RegionValue) {
    RegionValue["All"] = "";
    RegionValue["Moscow"] = "1";
    RegionValue["SaintPetersburg"] = "2";
})(RegionValue || (RegionValue = {}));
// type FiltersProps = {
//   skills: Array<string>;
//   setSkills: (skill: Array<string>) => void;
//   selectedCity: string;
//   setSelectedCity: (city: string) => void;
// };
const Filters = () => {
    const [value, setValue] = useState("");
    const { skills, selectedCity } = useSelector((state) => ({
        skills: state.vacancies.skills,
        selectedCity: state.vacancies.selectedCity,
    }), shallowEqual);
    const dispatch = useDispatch();
    const addSkill = () => {
        if (value.trim() !== "" && !skills.includes(value.trim())) {
            dispatch(setSkills([...skills, value.trim()]));
            dispatch(setPage(1));
            setValue("");
        }
    };
    const removeSkill = (skill) => {
        dispatch(setSkills(skills.filter((s) => s !== skill)));
    };
    return (_jsx(_Fragment, { children: _jsxs(Stack, { gap: "xs", children: [_jsxs(Box, { className: styles.filter, children: [_jsxs(Group, { align: "flex-end", mb: "xs", children: [_jsx(TextInput, { w: 215, label: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438", placeholder: "\u041D\u0430\u0432\u044B\u043A", value: value, onChange: (e) => setValue(e.currentTarget.value), onKeyDown: (e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill();
                                        }
                                    } }), _jsx(Button, { p: 0, opacity: 0.5, onClick: addSkill, children: _jsx("img", { src: icon, alt: "add" }) })] }), _jsx(Pill.Group, { children: skills.map((skill) => (_jsx(Pill, { withRemoveButton: true, onRemove: () => removeSkill(skill), children: skill }, skill))) })] }), _jsx(Box, { className: styles.filter, children: _jsx(NativeSelect, { w: 269, "data-testid": "city-select", leftSection: _jsx(IconMapPin, { size: 16 }), description: "\u0413\u043E\u0440\u043E\u0434", data: [
                            { value: RegionValue.All, label: "Все" },
                            { value: RegionValue.Moscow, label: "Москва" },
                            {
                                value: RegionValue.SaintPetersburg,
                                label: "Санкт-Петербург",
                            },
                        ], value: selectedCity, onChange: (e) => dispatch(setSelectedCity(e.currentTarget.value)) }) })] }) }));
};
export default memo(Filters);
