import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// import { Button, IconButton, Menu, MenuItem, Typography, styled } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { colors } from '../../theme/variables';
import React from 'react';
import CheckboxWithLabel from '../Checkbox';

export enum MenuType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export enum OpenerType {
  BUTTON = 'BUTTON',
  ONLY_ICON = 'ONLY_ICON',
}

export interface DropdownItem {
  label: string;
  value: string;
  selected?: boolean;
  icon?: React.ReactNode;
  children?: DropdownItem[];
}

interface DropdownProps {
  menuType?: MenuType;
  openerType?: OpenerType;
  items: DropdownItem[];
  setItems?: (items: DropdownItem[]) => void;
  onItemClick?: (item: DropdownItem) => void;
  title?: string;
  selectedItem?: DropdownItem;
  icon?: React.ReactNode;
}

const Dropdown = ({
  menuType = MenuType.SINGLE,
  openerType = OpenerType.BUTTON,
  items,
  setItems,
  onItemClick,
  title,
  selectedItem,
  icon,
}: DropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // Also close any open submenu when the main menu closes
    setSubmenuAnchorEl(null);
    setSubmenuItems(null);
  };

  const handleCheckboxChange = (item: DropdownItem) => {
    setItems?.(items.map((i) => (i.value === item.value ? { ...i, selected: !i.selected } : i)));
  };

  const handleSingleItemClick = (item: DropdownItem) => {
    onItemClick?.(item);
  };

  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [submenuItems, setSubmenuItems] = React.useState<DropdownItem[] | null>(null);
  const [submenuDirection, setSubmenuDirection] = React.useState<'left' | 'right'>('right');

  const estimateSubmenuWidth = 240;

  const computeDirection = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    if (spaceRight >= estimateSubmenuWidth) return 'right' as const;
    if (spaceLeft >= estimateSubmenuWidth) return 'left' as const;

    return spaceRight >= spaceLeft ? ('right' as const) : ('left' as const);
  };

  const openSubmenu = (event: React.MouseEvent<HTMLElement>, children: DropdownItem[]) => {
    const currentTarget = event.currentTarget as HTMLElement;
    const direction = computeDirection(currentTarget);
    setSubmenuDirection(direction);
    setSubmenuAnchorEl(currentTarget);
    setSubmenuItems(children);
  };

  const closeSubmenu = () => {
    setSubmenuAnchorEl(null);
    setSubmenuItems(null);
  };

  return (
    <>
      {openerType === OpenerType.BUTTON && (
        <StyledButton
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="text"
          disableElevation
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={handleClick}
          isOpen={open}
          endIcon={
            open ? (
              <KeyboardArrowUp fontSize="inherit" sx={{ fontSize: 16, color: colors.blueMain }} />
            ) : (
              <KeyboardArrowDown
                fontSize="inherit"
                sx={{ fontSize: 16, color: colors.grayTextMid }}
              />
            )
          }
        >
          {title || ''}
        </StyledButton>
      )}
      {openerType === OpenerType.ONLY_ICON && (
        <StyledIconButton isOpen={open} disableFocusRipple disableTouchRipple onClick={handleClick}>
          {icon || ''}
        </StyledIconButton>
      )}
      <Menu
        id="main-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'main-menu',
          },
          paper: {
            elevation: 0,
            sx: {
              boxShadow:
                '0px 1px 3px rgba(0,0,0,0.10), 0px 5px 5px rgba(0,0,0,0.09), 0px 12px 7px rgba(0,0,0,0.05), 0px 21px 8px rgba(0,0,0,0.01)',
              borderRadius: '6px',
            },
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuType === MenuType.MULTIPLE &&
          items.map((item, index) => (
            <StyledMenuItem isLastItem={index === items.length - 1} key={item.value} disableRipple>
              <CheckboxWithLabel
                label={item.label}
                checked={item.selected ?? false}
                onChange={() => {
                  handleCheckboxChange(item);
                }}
              />
            </StyledMenuItem>
          ))}
        {menuType === MenuType.SINGLE &&
          items.map((item, index) => (
            <StyledMenuItem
              isLastItem={index === items.length - 1}
              isSelected={item.value === selectedItem?.value}
              key={item.value}
              disableRipple
              onClick={(e) => {
                if (item.children && item.children.length) {
                  openSubmenu(e, item.children);
                } else {
                  handleSingleItemClick(item);
                  handleClose();
                }
              }}
            >
              {item.icon && item.icon}
              <StyledMenuItemText>{item.label}</StyledMenuItemText>

              {item.children && (
                <ChevronRight
                  fontSize="inherit"
                  sx={{ fontSize: 22, color: colors.grayTextMid, marginLeft: 'auto' }}
                />
              )}
            </StyledMenuItem>
          ))}
      </Menu>
      <Menu
        id="submenu"
        anchorEl={submenuAnchorEl}
        open={Boolean(submenuAnchorEl && submenuItems && submenuItems.length)}
        onClose={closeSubmenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: submenuDirection === 'right' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: submenuDirection === 'right' ? 'left' : 'right',
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              boxShadow:
                '0px 1px 3px rgba(0,0,0,0.10), 0px 5px 5px rgba(0,0,0,0.09), 0px 12px 7px rgba(0,0,0,0.05), 0px 21px 8px rgba(0,0,0,0.01)',
              borderRadius: '6px',
            },
          },
        }}
      >
        {submenuItems?.map((childItem, index) => (
          <StyledMenuItem
            key={childItem.value}
            isLastItem={index === (submenuItems?.length ?? 0) - 1}
            isSelected={false}
            disableRipple
            //npm i mui-nested-menu TODO: use this instead of the custom one
            onClick={(e) => {
              if (childItem.children && childItem.children.length) {
                openSubmenu(e, childItem.children);
              } else {
                handleSingleItemClick(childItem);
                closeSubmenu();
                handleClose();
              }
            }}
          >
            {childItem.icon && childItem.icon}
            <StyledMenuItemText>{childItem.label}</StyledMenuItemText>
            {childItem.children && (
              <ChevronRight
                fontSize="inherit"
                sx={{ fontSize: 22, color: colors.grayTextMid, marginLeft: 'auto' }}
              />
            )}
          </StyledMenuItem>
        ))}
      </Menu>
    </>
  );
};

interface StyledButtonProps {
  isOpen: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<StyledButtonProps>(({ isOpen }) => ({
  textTransform: 'none',
  color: isOpen ? colors.blueMain : colors.mainText,
}));

interface StyledIconButtonProps {
  isOpen: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<StyledIconButtonProps>(({ isOpen }) => ({
  svg: {
    color: isOpen ? colors.blueMain : colors.grayTextMid,
  },
}));

interface StyledMenuItemProps {
  isLastItem: boolean;
  isSelected?: boolean;
}

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isLastItem' && prop !== 'isSelected',
})<StyledMenuItemProps>(({ isLastItem, isSelected }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: '200px',
  borderBottom: isLastItem ? 'none' : `1px solid ${colors.grayOutline}`,
  padding: '0 16px',
  backgroundColor: isSelected ? colors.grayOutline : 'transparent',
}));

const StyledMenuItemText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  color: colors.mainText,
});

export default Dropdown;
