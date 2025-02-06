import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Container } from '../../shared/Container/Container';
import cl from './DetailedFilters.module.scss';
import cn from 'classnames';

const checkboxSections = [
  {
    name: 'Gender',
    options: ['Men', 'Women', 'Unisex'],
  },
  {
    name: 'Categories',
    options: [
      'Dresses',
      'Hoodies',
      'Jeans',
      'Outerwear',
      'Pants',
      'Sweaters',
      'Sweatshirts',
      'T-shirts',
      'Tops',
    ],
  },
  {
    name: 'Collections',
    options: ['Dark Impulse', 'Duality', 'Pure Essence', 'Total Black'],
  },
  {
    name: 'Hot Items',
    options: ['Best Sellers', 'New', 'Sale'],
  },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colorOptions = ['Black', 'White'];

type Props = {
  isFiltersVisible: boolean;
  selectedGenders: string[];
  setSelectedGenders: Dispatch<SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  selectedCollections: string[];
  setSelectedCollections: Dispatch<SetStateAction<string[]>>;
  selectedHotItems: string[];
  setSelectedHotItems: Dispatch<SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
};

export const DetailedFilters: React.FC<Props> = ({
  isFiltersVisible,
  selectedGenders,
  setSelectedGenders,
  selectedCategories,
  setSelectedCategories,
  selectedCollections,
  setSelectedCollections,
  selectedHotItems,
  setSelectedHotItems,
  selectedSizes,
  setSelectedSizes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  //#region булеві стейти
  const [isGenderListVisible, setIsGenderListVisible] = useState(true);
  const [isCategoriesListVisible, setIsCategoriesListVisible] = useState(true);
  const [isCollectionsListVisible, setIsCollectionsListVisible] =
    useState(true);
  const [isHotItemsListVisible, setIsHotItemsListVisible] = useState(true);
  const [isSizeListVisible, setIsSizeListVisible] = useState(true);
  const [isPriceListVisible, setIsPriceListVisible] = useState(true);
  const [isColorListVisible, setIsColorListVisible] = useState(true);
  //#endregion

  //#region refs
  const genderListRef = useRef<HTMLUListElement>(null);
  const categoriesListRef = useRef<HTMLUListElement>(null);
  const collectionsListRef = useRef<HTMLUListElement>(null);
  const hotItemsListRef = useRef<HTMLUListElement>(null);
  const sizeSectionRef = useRef<HTMLUListElement>(null);
  const priceSectionRef = useRef<HTMLDivElement>(null);
  const colorSectionRef = useRef<HTMLUListElement>(null);
  //#endregion

  //#region функціїі об'єкти для роботи з якимсь конкретним елементом списку
  const refsList = {
    Gender: genderListRef,
    Categories: categoriesListRef,
    Collections: collectionsListRef,
    'Hot Items': hotItemsListRef,
    Size: sizeSectionRef,
    Price: priceSectionRef,
    Color: colorSectionRef,
  };

  const booleanStatesList = {
    Gender: isGenderListVisible,
    Categories: isCategoriesListVisible,
    Collections: isCollectionsListVisible,
    'Hot Items': isHotItemsListVisible,
  };

  function toggleListVisibility(listName: string) {
    switch (listName) {
      case 'Gender':
        setIsGenderListVisible(!isGenderListVisible);
        break;
      case 'Categories':
        setIsCategoriesListVisible(!isCategoriesListVisible);
        break;
      case 'Collections':
        setIsCollectionsListVisible(!isCollectionsListVisible);
        break;
      case 'Hot Items':
        setIsHotItemsListVisible(!isHotItemsListVisible);
        break;
      case 'Size':
        setIsSizeListVisible(!isSizeListVisible);
        break;
      case 'Price':
        setIsPriceListVisible(!isPriceListVisible);
        break;
      case 'Color':
        setIsColorListVisible(!isColorListVisible);
        break;
      default:
        break;
    }
  }
  //#endregion

  function toggleFilterOptionsState(listName: string, option: string) {
    switch (listName) {
      case 'Gender':
        setSelectedGenders(prev =>
          prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option],
        );
        break;
      case 'Categories':
        setSelectedCategories(prev =>
          prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option],
        );
        break;
      case 'Collections':
        setSelectedCollections(prev =>
          prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option],
        );
        break;
      case 'Hot Items':
        setSelectedHotItems(prev =>
          prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option],
        );
        break;
      case 'Size':
        setSelectedSizes(prev =>
          prev.includes(option)
            ? prev.filter(i => i !== option)
            : [...prev, option],
        );
        console.log(selectedSizes);
        break;
      default:
        break;
    }
  }

  return (
    <Container
      className={cl.container}
      style={{
        transform: `${isFiltersVisible ? 'translateX(0)' : 'translateX(-100%)'}`,
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      {checkboxSections.map(section => (
        <section key={section.name} className={cl.checkboxSection}>
          <div className={cl.checkboxSection__titleButtonWrapper}>
            <h4 className={cl.checkboxSection__title}>{section.name}</h4>
            <button
              className={cn(cl.checkboxSection__hideButton, {
                [cl.checkboxSection__showButton]:
                  !booleanStatesList[section.name],
              })}
              onClick={() => toggleListVisibility(section.name)}
            />
          </div>

          <ul
            className={cn(cl.checkboxSection__list, {
              [cl.listHidden]: !booleanStatesList[section.name],
            })}
            ref={refsList[section.name]}
            style={{
              height: refsList[section.name]?.current?.scrollHeight,
            }}
          >
            {section.options.map(option => (
              <li key={option} className={cl.checkboxSection__checkboxItem}>
                <input
                  type="checkbox"
                  id={section.name + option}
                  className={cl.checkboxSection__checkbox}
                  onChange={() =>
                    toggleFilterOptionsState(section.name, option)
                  }
                />
                <label
                  htmlFor={section.name + option}
                  className={cl.checkboxSection__label}
                >
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className={cl.checkboxSection}>
        <div className={cl.checkboxSection__titleButtonWrapper}>
          <h4
            className={`${cl.checkboxSection__title} ${cl.checkboxSection__title_size}`}
          >
            Size
          </h4>
          <button
            className={cn(cl.checkboxSection__hideButton, {
              [cl.checkboxSection__showButton]: !isSizeListVisible,
            })}
            onClick={() => toggleListVisibility('Size')}
          />
        </div>

        <ul
          className={cn(cl.sizeList, {
            [cl.listHidden]: !isSizeListVisible,
          })}
          ref={sizeSectionRef}
          style={{ height: sizeSectionRef.current?.scrollHeight }}
        >
          {sizeOptions.map(size => (
            <li
              className={cn(cl.sizeList__item, {
                [cl.sizeList__item_selected]: selectedSizes.includes(size),
              })}
              onClick={() => toggleFilterOptionsState('Size', size)}
              key={size}
            >
              {size}
            </li>
          ))}
        </ul>
      </section>

      <section className={cl.checkboxSection}>
        <div className={cl.checkboxSection__titleButtonWrapper}>
          <h4 className={cl.checkboxSection__title}>Price</h4>
          <button
            className={cn(cl.checkboxSection__hideButton, {
              [cl.checkboxSection__showButton]: !isPriceListVisible,
            })}
            onClick={() => toggleListVisibility('Price')}
          />
        </div>

        <div
          className={cn(cl.priceContent, {
            [cl.listHidden]: !isPriceListVisible,
          })}
          ref={priceSectionRef}
          style={{ height: priceSectionRef.current?.scrollHeight }}
        >
          <div className={cl.priceContent__inputs}>
            <input
              type="number"
              className={cl.priceContent__input}
              value={minPrice}
              onChange={ev => setMinPrice(+ev.target.value)}
            />
            <span>&mdash;</span>
            <input
              type="number"
              className={cl.priceContent__input}
              value={maxPrice}
              onChange={ev => setMaxPrice(+ev.target.value)}
            />
          </div>
          {/* заюзати пізніше біблу react-range */}
          <input
            type="range"
            min={10}
            max={250}
            className={cl.priceContent__range}
          />
        </div>
      </section>

      <section className={cl.checkboxSection}>
        <div className={cl.checkboxSection__titleButtonWrapper}>
          <h4 className={cl.checkboxSection__title}>Color</h4>
          <button
            className={cn(cl.checkboxSection__hideButton, {
              [cl.checkboxSection__showButton]: !isColorListVisible,
            })}
            onClick={() => toggleListVisibility('Color')}
          />
        </div>

        <ul
          className={cn(cl.checkboxSection__list, {
            [cl.listHidden]: !isColorListVisible,
          })}
          ref={colorSectionRef}
          style={{
            height: colorSectionRef.current?.scrollHeight,
          }}
        >
          {colorOptions.map(option => (
            <li key={option} className={cl.checkboxSection__checkboxItem}>
              <input
                type="checkbox"
                id={option}
                className={cl.checkboxSection__checkbox}
              />
              <label htmlFor={option} className={cl.checkboxSection__label}>
                {option}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <button className={cl.resetButton}>Reset filters</button>
    </Container>
  );
};
