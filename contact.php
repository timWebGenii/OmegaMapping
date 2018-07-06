<?php
	$source_origin = trim($_REQUEST['__amp_source_origin']);//Security
	if($source_origin != "https://omegamapping.com"){
	echo "Not allowed origin";
	return;
	}
	header('AMP-Access-Control-Allow-Source-Origin: https://omegamapping.com');
	header('Content-Type: application/json; charset=UTF-8;'); 
    // variables start
	$name = "";
	$email = "";
	$message = "";
	$number = "";
	$address = "";
	
	$name =  trim($_REQUEST['name']);
	$email =  trim($_REQUEST['email']);
	$message =  trim($_REQUEST['message']);
	$number = trim($_REQUEST['number']);
	$address = trim($_REQUEST['address']);
	$wd416 = trim($_REQUEST['wd416']);
	$qb1226= trim($_REQUEST['qb1226']);

	
	// variables end
	if($wd416 != "" && $qb1226 != "253"){
		header('Status: 400', TRUE, 400);
		echo json_encode(array('message'=>'This is error message'));
	}
	// variables end
	
	// email address starts
	$emailAddress = 'tim@websitegenii.com';
	// email address ends
	
	$subject = "Message From: $name";	
	
	if($address != ''){
	$message = "<strong>From:</strong> $name <br/><br/> <strong>Phone Number:</strong> $number <br/><br/> <strong>Address:</strong> $address <br/><br/><strong>Message:</strong> $message";
	} else {
		$message = "<strong>From:</strong> $name <br/><br/> <strong>Phone Number:</strong> $number <br/><br/> <strong>Message:</strong> $message";
	}
	
	$headers = '';
	$headers .= 'From: '. $name . '<' . $email . '>' . "\r\n";
	$headers .= 'Reply-To: ' . $email . "\r\n";
	
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	//send email function starts
	$result = mail($emailAddress, $subject, $message, $headers);
	if($result === true && !empty($emailAddress)){
		echo json_encode(array("name"=>$name,"email"=>$email));
	}else{
		header('Status: 400', TRUE, 400);
		echo json_encode(array('message'=>'This is error message'));
	}
	//send email function ends
?>