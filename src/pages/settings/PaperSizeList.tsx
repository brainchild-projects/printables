import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PaperSize from '../../lib/PaperSize';
import Paper from '../../components/uiElements/Paper';
import List from '../../components/uiElements/List';
import ListItem from '../../components/uiElements/ListItem';
import ListItemSecondaryAction from '../../components/uiElements/ListIteemSecondaryAction';
import ListItemText from '../../components/uiElements/ListItemText';
import Typography from '../../components/uiElements/Typography';

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
          <IconButton onClick={() => onEdit(size)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(size)}>
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
