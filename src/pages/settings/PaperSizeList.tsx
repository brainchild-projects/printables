import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaperSize from '../../lib/PaperSize.js';
import Paper from '../../components/uiElements/Paper.js';
import List from '../../components/uiElements/List.js';
import ListItem from '../../components/uiElements/ListItem.js';
import ListItemSecondaryAction from '../../components/uiElements/ListIteemSecondaryAction.js';
import ListItemText from '../../components/uiElements/ListItemText.js';
import Typography from '../../components/uiElements/Typography.js';

interface PaperSizeListProps {
  paperSizes: PaperSize[];
  onEdit: (size: PaperSize) => void;
  onDelete: (size: PaperSize) => void;
}

function PaperSizeList({ paperSizes, onEdit, onDelete }: PaperSizeListProps): JSX.Element {
  const listItems = paperSizes.map((size) => {
    const { name, width, height } = size;
    return (
      <ListItem
        key={`${width}:${height}`}
      >
        <ListItemText
          primary={name}
          secondary={`${width}mm × ${height}mm`}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onEdit(size)} size="large">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(size)} size="large">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  const content = listItems.length > 0
    ? (
      <List
        aria-label="Paper Sizes"
      >
        {listItems}
      </List>
    )
    : (
      <div style={{ padding: '2em' }}>
        <Typography
          component="p"
          align="center"
        >
          No custom paper sizes yet.
        </Typography>
      </div>
    );
  return (
    <Paper>{content}</Paper>
  );
}

export default PaperSizeList;
