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
import { NestedMenuItem } from 'mui-nested-menu';

export interface DropdownItem {
  label: string;
  value: string;
  selected?: boolean;
  icon?: React.ReactNode;
  children?: DropdownItem[];
}

interface DropdownProps {
  items: DropdownItem[];
  onItemClick?: (item: DropdownItem) => void;
  selectedItem?: DropdownItem;
  icon?: React.ReactNode;
}

const NestedDropdown = ({ items, onItemClick, icon }: DropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSingleItemClick = (item: DropdownItem) => {
    onItemClick(item);
  };

  return (
    <>
      <StyledIconButton isOpen={open} disableFocusRipple disableTouchRipple onClick={handleClick}>
        {icon || ''}
      </StyledIconButton>
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
        {items.map((item, index) =>
          item.children ? (
            <StyledNestedMenuItem
              isLastItem={index === items.length - 1}
              leftIcon={item.icon || ''}
              rightIcon={<ChevronRight />}
              label={<StyledMenuItemText>{item.label}</StyledMenuItemText>}
              parentMenuOpen={open}
            >
              {item.children.map((child, index) => (
                <StyledMenuItem
                  isLastItem={index === item.children.length - 1}
                  key={child.value}
                  disableRipple
                  onClick={(e) => {
                    handleSingleItemClick(child);
                    handleClose();
                  }}
                >
                  {child.icon && child.icon}
                  <StyledMenuItemText>{child.label}</StyledMenuItemText>
                </StyledMenuItem>
              ))}
            </StyledNestedMenuItem>
          ) : (
            <StyledMenuItem
              isLastItem={index === items.length - 1}
              key={item.value}
              disableRipple
              onClick={(e) => {
                handleSingleItemClick(item);
                handleClose();
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
          ),
        )}
      </Menu>
    </>
  );
};

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

const StyledNestedMenuItem = styled(NestedMenuItem, {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})<StyledMenuItemProps>(({ isLastItem }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: '200px',
  borderBottom: isLastItem ? 'none' : `1px solid ${colors.grayOutline}`,
  padding: '0 16px',
  svg: {
    color: colors.grayTextMid,
  },

  div: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isLastItem',
})<StyledMenuItemProps>(({ isLastItem }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: '200px',
  borderBottom: isLastItem ? 'none' : `1px solid ${colors.grayOutline}`,
  padding: '0 16px',
}));

const StyledMenuItemText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  color: colors.mainText,
});

export default NestedDropdown;
