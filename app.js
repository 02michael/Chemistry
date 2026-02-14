$(document).ready(function() {
$('.group_name').tipTop();
var myArray = ['Aluminium', 'Barium', 'Bromine', 'Carbon', 'Chlorine', 'Chromium', 'Copper', 'Fluorine', 'Ethanol', 'Hydrogen', 'Iodine', 'Iron', 'Lithium', 'Magnesium', 'Mercury', 'Nickel', 'Nitrogen', 'Oxygen', 'Plasma', 'Platinum', 'Ghost chili juice', 'Ghost chili juice', 'Space-soybean oil', 'Monosodium glutamate', 'Stabilizing Agent', 'Diphenhydramine', 'Saline-Glucose Solution', 'Strange Reagent', 'Styptic Powder'];
var amount = 10;

$('.amount').on('click', '.butt', function() {
	amount = $(this).text();
	$('.amount a.nobg').siblings().addClass('nobg');;
	$(this).removeClass('nobg');
});
	
$('.chems').on('click', '.chem', function() {
	//var chem = myArray[Math.floor(Math.random() * myArray.length)];
	var chem = $(this).text();
	if ($('.chems').hasClass('grp')) {
		$(".groups .reagents span").append(chem.toLowerCase() + ", ");
	} else {
		if ($('#reagents tr').hasClass(chem.toLowerCase())){
			var block = $("#reagents tr:contains("+chem+")")
			var value = $("#reagents tr td:contains("+chem+")").closest('tr td').siblings('td:nth-child(2)').text();
			value = parseInt(value) + parseInt(amount);
			$("#reagents tr td:contains("+chem+")").closest('tr td').siblings('td:nth-child(2)').text(value);

			block.velocity('stop', true).velocity({color: "#0f0"}, 150, function() {block.velocity({color: "#fff"}, 150);});
		} else {
			$("<tr class='"+chem.toLowerCase()+"' style='color: rgb(0, 255, 0);'>><td>" + chem + "</td><td>" + amount + "</td><td class='adjust'><A class='iso' href='#'>Iso</A><A class='all' href='#'>All</A><A class='rem' href='#'>5</A><A class='rem' href='#'>1</A></td></tr>").hide().appendTo("#reagents")
				.velocity("fadeIn", 200)
				.velocity({color: "#fff"}, 150);
			react()
		}
	}
});
function react() {
	var chem1 = 'Hydrogen'
	var chem2 = 'Iron'
	var chem3 = 'Oxygen'
	var result = 'Stabilizing Agent'
	if ($('#reagents tr').hasClass('hydrogen') && $('#reagents tr').hasClass('iron') && $('#reagents tr').hasClass('oxygen')) {
		fade($("#reagents tr:contains("+chem1+"), #reagents tr:contains("+chem2+"), #reagents tr:contains("+chem3+")"));
		//fade($('#reagents tr').hasClass(chem3));
		$("<tr class='"+result.toLowerCase()+"' style='color: rgb(0, 255, 0);'>><td>" + result + "</td><td>" + 10 + "</td><td class='adjust'><A class='iso' href='#'>Iso</A><A class='all' href='#'>All</A><A class='rem' href='#'>5</A><A class='rem' href='#'>1</A></td></tr>").hide().appendTo("#reagents")
				.velocity("fadeIn", 200)
				.velocity({color: "#fff"}, 150);			
	}
};
	
$('#reagents').on('click', '.all', function() {
	fade($(this).closest('tr'));
});
$('#reagents').on('click', '.iso', function() {
	fade($(this).closest('tr').siblings());
});

$('#reagents').on('click', '.rem', function() {
	var block = $(this).closest('tr');
	var value = $(this).closest('tr td').siblings('td:nth-child(2)').text();
	block.velocity('stop', true).velocity({
		color: "#f00"
	}, 150, function() {
		block.velocity({
			color: "#fff"
		}, 150);
	});
	//block
	//		.velocity({color: "#f00"},150)
	//		.velocity({ color: "#fff", delay: 100}, 150);
	if ($(this).text() == 1) {
		value = parseInt(value) - parseInt(1);
	} else {
		value = parseInt(value) - parseInt(5);
	}
	$(this).closest('tr td').siblings('td:nth-child(2)').text(value);
	if (value <= 0) {
		fade($(this).closest('tr'));
	}

});

function fade(e) {
	$(e).velocity("fadeOut", 200, function() { $(this).remove(); });
};

$('.chems').on('click', '.add', function() {
	//fade($(this).closest('tr').siblings());
	//$('.chems').addClass('grp');
	$('.chems').toggleClass('grp');
	if ($('.chems').hasClass('grp')) {
		$('.chems .chem i').removeClass('icon-chevron-down');
		$('.chems .chem i').addClass('icon-plus');
		$("<div class='head new'><A class='butt creategroup' href='#'><i class='icon-check'></i>Create This Group </A><A class='butt' href='#'><i class='icon-list-alt'></i>Create from a list</A><A class='butt right' href='#'><i class='icon-ban-circle'></i>Cancel Group</A></div><div class='label reagents'><i class='icon-file-alt'></i>New Group: <span></span><a class='right' href='#'><i class='icon-trash'></i>Delete</a></div>").hide().appendTo(".groups").velocity("fadeIn", {
			duration: 200
		})
	} else {
		$('.chems .chem i').removeClass('icon-plus');
		$('.chems .chem i').addClass('icon-chevron-down');
		$(".groups").empty();
	}
});

$('.chems').on('click', '.delete', function() {
	//fade($(this).closest('.group'));
	$(this).closest('.group').remove();
	//$(this).remove();
});
$('.groups').on('click', '.creategroup', function() {
	var name = prompt("Please enter group name", "Group Name");
	if (name != null) {
		//$("<div class='group'><a class='group_name' title='" +$(".groups .reagents span").text()+"'href='#'><i class='icon-star'></i>"+name+"</a><a class='delete' href='#'><i class='icon-trash'></i></a></div>").appendTo(".chems");
		$(".chems .add").before("<div class='group'><a class='group_name' title='" + $(".groups .reagents span").text() + "'href='#'><i class='icon-star'></i>" + name + "</a><a class='delete' href='#'><i class='icon-trash'></i></a></div>");
		$('.group_name').tipTop();
		$(".groups .reagents span").empty()
		$(".groups").empty();
		$('.chems .chem i').removeClass('icon-plus');
		$('.chems .chem i').addClass('icon-chevron-down');
		$('.chems').toggleClass('grp');
	}
});
});