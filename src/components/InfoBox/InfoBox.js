import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import './style.css';

function InfoBox({ title, cases, total, active, isRed, ...props}) {
    console.log(title, active);
    return (
        <div>
            <Card
                onClick={props.onClick}
                className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
            >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    {title}
                    </Typography>
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                    </h2>

                    <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox