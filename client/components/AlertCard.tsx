import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AlertCard({alertname, description, title, service, severity, state, activeAt, value, instance}) {

    //color will be red for critical, orange for warning
    const color = severity === 'critical' ? "#BC544B" : "#EC9706";

    return (
      <Card sx={{ minWidth: 275, border: "2px solid", padding: "10px", boxShadow: `5px 10px ${color}`}}>
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.primary" gutterBottom>
            Alert Name: {alertname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
            Description: {description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
           Title: {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Service: {service}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Severity: {severity}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            State: {state}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Active at: {activeAt}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Value: {value}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Instance: {instance}
          </Typography>
        </CardContent>
      </Card>
    );
  }