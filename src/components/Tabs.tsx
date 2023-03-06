import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { composeClassNames, makeId, useId } from "../utils/helpers";

type TabComponentProps = {
  as?: keyof JSX.IntrinsicElements;
  value?: string;
  children: React.ReactNode;
  className: string;
  defaultValue?: string;
  props?: React.ReactNode;
};

const TabsContext = createContext<any>("");

export function Tabs({
  as: Element = "div",
  children,
  className,
  defaultValue,
  ...props
}: TabComponentProps) {
  const INTERNAL_CLASS = "tabs";
  const tabsId = makeId(
    "tabs",
    useMemo(() => useId(), [])
  );
  const [activeValue, setActiveValue] = useState(defaultValue || null);
  return (
    <>
      <Element
        className={composeClassNames(INTERNAL_CLASS, className)}
        {...props}
      >
        <TabsContext.Provider
          value={{
            tabsId,
            isActive: useCallback(
              (value: string) => {
                return value === activeValue;
              },
              [activeValue]
            ),
            setActiveValue,
          }}
        >
          {children}
        </TabsContext.Provider>
      </Element>
    </>
  );
}

Tabs.displayName = "Tabs";

export function TabList({
  as: Element = "div",
  children,
  className,
  ...props
}: TabComponentProps) {
  const INTERNAL_CLASS = "tabs__tab-list";
  return (
    <>
      <Element
        className={composeClassNames(INTERNAL_CLASS, className)}
        role="tablist"
        {...props}
      >
        {children}
      </Element>
    </>
  );
}

TabList.displayName = "TabList";

export function Tab({
  as: Element = "button",
  value,
  children,
  className,
  ...props
}: TabComponentProps) {
  const { tabsId, isActive, setActiveValue } = useContext(TabsContext);
  const active = isActive(value);
  const panelId = makeId(tabsId, "panel", value as string);
  const buttonId = makeId(tabsId, "button", value as string);
  const INTERNAL_CLASS = "tabs__tab";

  const handleClick = (e: React.MouseEvent) => {
    setActiveValue(value);
  };
  return (
    <>
      <Element
        className={composeClassNames(INTERNAL_CLASS, className)}
        style={active ? { backgroundColor: "white", color: "black" } : {}}
        id={buttonId}
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        aria-controls={panelId}
        {...props}
        role="tab"
        onClick={handleClick}
      >
        {children}
      </Element>
    </>
  );
}

Tab.displayName = "Tab";

export function TabPanels({
  as: Element = "div",
  children,
  className,
  ...props
}: TabComponentProps) {
  const INTERNAL_CLASS = "tabs__panels";
  return (
    <>
      <Element
        className={composeClassNames(INTERNAL_CLASS, className)}
        {...props}
      >
        {children}
      </Element>
    </>
  );
}

TabPanels.displayName = "TabPanelList";

export function TabPanel({
  as: Element = "div",
  value,
  children,
  className,
  ...props
}: TabComponentProps) {
  const INTERNAL_CLASS = "tabs__panel";
  const { tabsId, isActive } = useContext(TabsContext);
  const active = isActive(value);
  const panelId = makeId(tabsId, "panel", value as string);
  const buttonId = makeId(tabsId, "button", value as string);
  return (
    <>
      <Element
        className={composeClassNames(INTERNAL_CLASS, className)}
        id={panelId}
        aria-labelledby={buttonId}
        tabIndex={active ? 0 : -1}
        hidden={!active ? true : undefined}
        {...props}
        role="tabpanel"
      >
        {children}
      </Element>
    </>
  );
}
TabPanel.displayName = "TabPanel";
