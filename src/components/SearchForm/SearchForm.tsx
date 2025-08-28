import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type SearchFormProps = {
  onSearch: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchForm = ({
  searchValue,
  setSearchValue,
  onSearch,
}: SearchFormProps) => {
  return (
    <Group align="flex-end">
      <TextInput
        w={403}
        styles={{ input: { height: 40 } }}
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={16} />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
          }
        }}
      />
      <Button variant="filled" color="#4263eb" h={40} onClick={onSearch}>
        Найти
      </Button>
    </Group>
  );
};
