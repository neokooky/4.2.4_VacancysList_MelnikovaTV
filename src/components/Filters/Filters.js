import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, 
// Button,
// Group,
NativeSelect, 
// Pill,
Stack,
// TextInput,
 } from "@mantine/core";
import styles from "./Filters.module.css";
// import icon from "../../images/add_icon.svg";
import { IconMapPin } from "@tabler/icons-react";
export const Filters = ({ 
// skills,
// setSkills,
selectedCity, setSelectedCity, }) => {
    // const [value, setValue] = useState("");
    // const addSkill = () => {
    //   if (value.trim() !== "" && !skills.includes(value.trim())) {
    //     setSkills([...skills, value.trim()]);
    //     setValue("");
    //   }
    // };
    // const removeSkill = (skill: string) => {
    //   setSkills(skills.filter((s) => s !== skill));
    // };
    return (_jsx(_Fragment, { children: _jsx(Stack, { gap: "xs", children: _jsx(Box, { className: styles.filter, children: _jsx(NativeSelect, { w: 269, "data-testid": "city-select", leftSection: _jsx(IconMapPin, { size: 16 }), description: "\u0413\u043E\u0440\u043E\u0434", data: [
                        { value: "", label: "Все" },
                        { value: "1", label: "Москва" },
                        { value: "2", label: "Санкт-Петербург" },
                    ], value: selectedCity, onChange: (e) => setSelectedCity(e.currentTarget.value) }) }) }) }));
};
