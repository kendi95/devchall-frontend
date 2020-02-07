import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, Grid, InputLabel } from '@material-ui/core';

import AvatarEditor from 'react-avatar-editor';

export default function DialogEditImage(props) {

    const { open, image, setEditorRef } = props;
    const [scale, setScale] = useState(1.0);

    const handleScale = (e, newValue) => {
        setScale(newValue);
    }

    return (
        <Dialog open={open} maxWidth="lg" fullWidth={true} aria-labelledby="dialog">
            <DialogTitle id="dialog" style={{textAlign: 'center'}}>Editação de imagem</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <AvatarEditor 
                            image={image} 
                            width={480} 
                            height={480} 
                            border={50} 
                            scale={scale}
                            rotate={0} 
                            ref={setEditorRef}
                            style={{borderRadius: 6}}
                            /> 
                    </Grid>

                    <Grid item xs={7} style={{textAlign: 'center', marginTop: '1%'}}>
                        <InputLabel variant="standard">Zoom</InputLabel>
                    </Grid>
                    <Grid item xs={8} style={{textAlign: 'center', marginLeft: '15%'}}>
                        <Slider aria-labelledby="input-slider" 
                            style={{width: 500}} 
                            min={1}
                            max={2}
                            step={0.1}
                            onChange={handleScale} 
                            valueLabelDisplay="auto"
                            />
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.handleClose()}>Cancelar</Button>
                <Button color="primary" onClick={() => props.handleSave()}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}